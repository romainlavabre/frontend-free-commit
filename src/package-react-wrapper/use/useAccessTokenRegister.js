import database from "../database/database";
import isNull from "../mixin/isNull";
import {useEffect, useState} from "react";

export default function () {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const [initialized, setInitialized] = useState(false);

    if (!initialized) {
        try {
            const decodedToken = decodeAccessToken(accessToken);
            database.write("authentication", 'access_token', accessToken);
            database.write("authentication", 'roles', decodedToken.roles);
            database.write("authentication", 'username', decodedToken.preferred_username);
            database.write("authentication", 'id', decodedToken.attributes.external_id);
            database.write("authentication", "attributes", decodedToken.attributes);
            setInitialized(true);
        } catch (e) {

        }
    }

    useEffect(() => {

        const newAccessTokenHandler = e => {
            if (e.data.type === "new-access-token") {
                database.write("authentication", "access_token", e.data.data.access_token);
                database.write("authentication", 'roles', e.data.data.roles);
                database.write("authentication", 'username', e.data.data.username);
                database.write("authentication", 'id', e.data.data.attributes.external_id);
                database.write("authentication", "attributes", e.data.data.attributes);

                console.info("Receive new access token");

                notifyIframe(e.data.data.access_token, e.data.data.roles, e.data.data.username, e.data.data.attributes.external_id, e.data.data.attributes);
            }
        };

        const beforeUnload = () => {
            if (!isNull(window.global?.winOpened)) {
                window.global.winOpened.forEach(winRef => {
                    winRef.ref.close();
                });
            }
        }

        window.addEventListener("message", newAccessTokenHandler);
        window.addEventListener("pagehide", beforeUnload);

        return () => window.removeEventListener("message", newAccessTokenHandler);
    }, []);

    const notifyIframe = (accessToken, roles, username, external_id, attributes) => {
        const iFrames = document.getElementsByTagName('iframe');

        if (isNull(iFrames)) return;

        Object.values(iFrames).forEach(iFrame => {
            iFrame.contentWindow.postMessage({
                type: "new-access-token",
                data: {
                    access_token: accessToken,
                    roles: roles,
                    username: username,
                    id: external_id,
                    attributes: attributes
                }
            }, iFrame.src.split("?")[0]);
        });

        if (!isNull(window.global?.winOpened)) {
            window.global.winOpened.forEach(winRef => {

                winRef.ref.postMessage({
                    type: "new-access-token",
                    data: {
                        access_token: accessToken,
                        roles: roles,
                        username: username,
                        id: external_id,
                        attributes: attributes
                    }
                }, winRef.url);
            });
        }
    }


    return !isNull(accessToken);
}

function decodeAccessToken(token) {
    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
}