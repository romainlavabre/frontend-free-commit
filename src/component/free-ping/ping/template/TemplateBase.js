import LinkIcon from "../../../util/icon/LinkIcon";
import api from "../../../../api/api";
import ZoomIcon from "../../../util/icon/ZoomIcon";
import TemplateEditor from "./TemplateEditor";
import React, {useState} from "react";
import event from "../../../../event/event";
import useEventDispatcher from "../../../../use/useEventDispatcher";
import {useSelector} from "react-redux";
import isNull from "../../../../mixin/global/isNull";
import useAlert from "../../../../use/useAlert";
import UpdateEntity from "../../../util/form/UpdateEntity";

export default function ({pingId, prop}) {
    const alert = useAlert();
    const eventDispatcher = useEventDispatcher();
    const ping = useSelector(state => state.api?.["api-free-ping"]?.pings?.values[pingId]);
    const [fullScreenOpen, setFullScreenOpen] = useState(false);


    const fullScreen = () => {
        setFullScreenOpen(true);
        eventDispatcher.launcher(event.OPEN_MODAL, {
            component: <TemplateEditor
                prop={prop}
                initialContent={ping[prop]}
                pingId={pingId}
            />
        });

        const subscriber = () => {
            setFullScreenOpen(false);
        }

        eventDispatcher.subscribe(event.CLOSE_MODAL, subscriber);

        return () => eventDispatcher.unsubscribe(event.CLOSE_MODAL, subscriber);
    }

    if (isNull(ping)) return null;

    return (
        <>
            {
                prop === "down_time_detected_template" || prop === "down_time_ended_template"
                    ? (
                        <div>
                            <UpdateEntity
                                subject="pings"
                                id={pingId}
                                service="api-free-ping"
                                role="admin"
                                fields={[
                                    {
                                        title: "Mail subject",
                                        name: "down_time_user_subject",
                                        type: "text"
                                    }
                                ]}
                            />
                        </div>
                    )
                    : null
            }

            {
                prop === "slow_down_detected_template" || prop === "slow_down_ended_template"
                    ? (
                        <div>
                            <UpdateEntity
                                subject="pings"
                                id={pingId}
                                service="api-free-ping"
                                role="admin"
                                fields={[
                                    {
                                        title: "Mail subject",
                                        name: "slow_down_user_subject",
                                        type: "text"
                                    }
                                ]}
                            />
                        </div>
                    )
                    : null
            }
            <div className="flex justify-between">
                <a
                    className="link ml-5 flex"
                    target="_blank"
                    href="https://velocity.apache.org/engine/1.7/user-guide.html#references"
                >
                    <LinkIcon size={6}/>
                    Read the velocity template doc
                </a>
                <div className="flex items-center">
                    <div>
                        <input className="input-text" placeholder={"Send test email to"}
                               onKeyDown={e => {
                                   if (e.key === "Enter") {
                                       if (prop.includes("down_time")) {
                                           api.freeping.config.checkDownTimeEmailForPing(e.target.value, pingId);
                                       } else {
                                           api.freeping.config.checkSlowDownEmailForPing(e.target.value, pingId);
                                       }

                                       alert.launch("Mail sent", "success");
                                   }
                               }}/>
                    </div>
                    <div>
                        <button className="badge-blue-square" onClick={fullScreen}>
                            <ZoomIcon size={6}/>
                        </button>
                    </div>
                </div>
            </div>

            {
                fullScreenOpen
                    ? null
                    : <TemplateEditor
                        key={prop}
                        prop={prop}
                        initialContent={ping[prop]}
                        pingId={pingId}
                    />
            }
        </>
    )
}