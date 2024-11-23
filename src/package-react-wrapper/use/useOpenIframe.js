import isNull from "../mixin/isNull";
import database from "../database/database";
import {useState} from "react";
import Modal from "../material/modal/Modal";
import ModalConfig from "../material/modal/ModalConfig";

export default function () {
    const [iframe, setIframe] = useState(null);

    return {
        openIframe: (link, action = null, data = null) => {
            if (!isNull(action)) {
                const url = link + '?action=' + JSON.stringify({
                    action: action,
                    data: data
                }) + `&accessToken=${database.read("authentication", "access_token")}`;

                const winRef = window.open(url, "_blank", "location=yes");

                if (isNull(window.global)) {
                    window.global = {};
                }

                if (isNull(window.global.winOpened)) {
                    window.global.winOpened = [];
                }

                window.global.winOpened.push({ref: winRef, url: link});

                return;

                setIframe(<Modal modalConfig={
                    new ModalConfig()
                        .setOnClose(() => setIframe(null))
                        .setHeight("98%")
                        .setWidth("98%")
                        .setComponent(
                            <iframe
                                height={"100%"}
                                width={"100%"}
                                style={{border: "none", margin: 0, padding: 0, overflow: "hidden"}}
                                src={url + `&accessToken=${database.read("authentication", "access_token")}`}
                            />
                        )
                }/>);
            }
        },
        iframe
    }
}