import database from "../database/database";
import isNull from "../mixin/isNull";
import {useEffect} from "react";

const PATH_DATA_UPDATE_EVENT = "/data-update-event/event";


export default function () {
    useEffect(() => connect(), []);

    const onDataUpdateEvent = payload => {
        if (!isNull(window.global.websocketserver?.onTriggerred?.[payload.registration_id])) {
            window.global.websocketserver?.onTriggerred?.[payload.registration_id](payload);
            return;
        }

        /**
         const buildService = () => {
         const servicePart = payload.service.split("-");
         let service = "";

         servicePart.forEach(part => {
         if (part !== "service") {
         service += part.substring(0, 1).toUpperCase() + part.substring(1);
         }
         });

         return service.substring(0, 1).toLowerCase() + service.substring(1);
         }

         const buildSubject = subject => {
         const firstLetter = subject.substring(0, 1);
         let end = subject.substring(1);

         const groups = [...end.matchAll(/[A-Z]/g)];

         if (!isNull(groups)) {
         groups.forEach(group => {
         end = end.replaceAll(group, "_" + group)
         });
         }

         subject = (firstLetter + end).toUpperCase();

         const servicePart = payload.service.split("-");
         let service = "";

         servicePart.forEach(part => {
         if (part !== "service") {
         service += part.substring(0, 1).toUpperCase() + part.substring(1);
         }
         });

         return entity[buildService()][subject];
         }

         const subject = buildSubject(payload.entity);

         if (payload.type === "DELETED") {
         dispatch(remove({
         service: buildService(),
         subject: subject,
         id: payload.id
         }))
         return;
         }

         if (!isNull(window.global?.websocketserver?.circuitBreaker)
         && window.global.websocketserver.circuitBreaker.includes(`${subject}-${payload.id}`)) {
         return;
         }

         findOneBy(payload.service, subject, "id", payload.id, service.defaultRole(payload.service, subject), 2);
         */
    }

    const connect = () => {
        if (isNull(process.env.REACT_APP_API_STICKY_URL)) return;

        if (isNull(window.global?.websocketserver?.ws)) {
            if (isNull(window.global?.websocketserver)) {
                if (isNull(window.global)) {
                    window.global = {};
                }

                window.global.websocketserver = {};
            }

            window.global.websocketserver.ws = new WebSocket(process.env.REACT_APP_API_STICKY_URL.replace("https", "wss") + "/service-websocket-server");

            window.global.websocketserver.interval = setInterval(() => window.global.websocketserver.ws.send(JSON.stringify({
                path: "/public/ping/ping"
            })), 10000);

            window.global.websocketserver.ws.onclose = () => onClose();
            window.global.websocketserver.ws.onopen = () => onOpen();
            window.global.websocketserver.ws.onmessage = e => onMessage(e);
        }
    }

    const onClose = () => {
        window.global.websocketserver.ws = null;

        setTimeout(() => {
            connect();
        }, 2000);
    }

    const onMessage = e => {
        try {
            const payload = JSON.parse(e.data);

            switch (payload.path) {
                case PATH_DATA_UPDATE_EVENT:
                    onDataUpdateEvent(payload);
                    break;
            }
        } catch (ignored) {
        }

    };

    const onOpen = () => {
        if (isNull(window.global.websocketserver.ws)) return;

        window.global.websocketserver.ws.send(JSON.stringify({authorization: `Bearer ${database.read("authentication", "access_token")}`}));

        setTimeout(() => {
            if (!isNull(window.global.websocketserver.ws) && !isNull(window.global.websocketserver.state)) {
                const keys = Object.keys(window.global.websocketserver.state);

                for (let i = 0; i < keys.length; i++) {
                    window.global.websocketserver.ws.send(JSON.stringify(window.global.websocketserver.state[keys[i]]));
                }
            }
        }, 1000);
    };


    const subscribe = (payload, depthCall = 1) => {
        if (isNull(window.global.websocketserver.ws) || window.global.websocketserver.ws.readyState !== 1) {
            setTimeout(() => subscribe(payload, depthCall + 1), 2000);
            return;
        }

        const request = {
            path: "/data-update-event/subscribe",
            registration_id: payload.registration_id,
            to: payload.to
        };

        try {
            window.global.websocketserver.ws.send(JSON.stringify(request));
        } catch (e) {
            setTimeout(() => subscribe(payload, depthCall + 1), depthCall > 5 ? 5000 : depthCall * 1000);
        }

        if (isNull(window.global.websocketserver.state)) {
            window.global.websocketserver.state = {};
        }

        window.global.websocketserver.state[payload.registration_id] = request;

        if (!isNull(payload.onTriggerred)) {
            if (isNull(window.global.websocketserver.onTriggerred)) {
                window.global.websocketserver.onTriggerred = {}
            }

            window.global.websocketserver.onTriggerred[payload.registration_id] = payload.onTriggerred;
        } else {
            if (isNull(window.global.websocketserver.onTriggerred)) return;

            delete window.global.websocketserver.onTriggerred[payload.registration_id];
        }
    }


    return {
        dataUpdateEvent: {
            subscribe: subscribe
        },
        isConnected: () => {
            return !isNull(window.global.websocketserver.ws) && window.global.websocketserver.ws.readyState === 1
        }
    };
}