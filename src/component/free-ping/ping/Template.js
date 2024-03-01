import React, {useState} from "react";
import {useSelector} from "react-redux";
import isNull from "../../../mixin/global/isNull";
import CheckCircleIcon from "../../util/icon/CheckCircleIcon";
import useEventDispatcher from "../../../use/useEventDispatcher";
import event from "../../../event/event";
import ZoomIcon from "../../util/icon/ZoomIcon";
import TemplateEditor from "./TemplateEditor";

export default function ({pingId}) {
    const eventDispatcher = useEventDispatcher();
    const ping = useSelector(state => state.api?.["api-free-ping"]?.pings?.values[pingId]);
    const [selected, setSelected] = useState({
        prop: "down_time_technical_template",
        title: "Down time template for technical team"
    });
    const [fullScreenOpen, setFullScreenOpen] = useState(false);

    const fullScreen = () => {
        setFullScreenOpen(true);
        eventDispatcher.launcher(event.OPEN_MODAL, {
            component: <TemplateEditor
                key={selected.prop} prop={selected.prop}
                initialContent={ping[selected.prop]}
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
        <div>
            <h5 className="text-2xl">Templates</h5>

            <div className="grid grid-cols-2 gap-4">
                <table className="col-span-1 text-left">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Expression</th>
                        <th>Nullable</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>ping_title</td>
                        <td>Title of ping</td>
                        <td>$ping_title</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>ping_ping_url</td>
                        <td>URL to ping</td>
                        <td>$ping_ping_url</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>ping_slow_down_seconds</td>
                        <td>Delay for slowdown</td>
                        <td>$ping_slow_down_seconds</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>ping_interval</td>
                        <td>Interval of ping</td>
                        <td>$ping_interval</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>incident_of</td>
                        <td>Start date of incident</td>
                        <td>$incident_of</td>
                        <td>No</td>
                    </tr>
                    <tr>
                        <td>incident_at</td>
                        <td>End date of incident</td>
                        <td>$incident_at</td>
                        <td>Yes</td>
                    </tr>
                    </tbody>
                </table>
                <div className="col-span-1">
                    <div className="flex justify-between">
                        <button
                            className={isNull(ping.down_time_technical_template) ? "button-red" : "button-green"}
                            title={isNull(ping.down_time_technical_template) ? "Not configured" : "Configured"}
                            onClick={() => setSelected({
                                prop: "down_time_technical_template",
                                title: "Down time template for technical team"
                            })}
                        >
                            <div>
                                Down time template for technical team
                            </div>
                            <div className="ml-3">
                                <CheckCircleIcon size={6}/>
                            </div>
                        </button>
                        <button
                            className={isNull(ping.slow_down_technical_template) ? "button-red" : "button-green"}
                            title={isNull(ping.slow_down_technical_template) ? "Not configured" : "Configured"}
                            onClick={() => setSelected({
                                prop: "slow_down_technical_template",
                                title: "Slow down template for technical team"
                            })}
                        >
                            <div>
                                Slow down template for technical team
                            </div>
                            <div className="ml-3">
                                <CheckCircleIcon size={6}/>
                            </div>
                        </button>
                    </div>
                    <div className="flex justify-between mt-5">
                        <button
                            className={isNull(ping.down_time_detected_template) ? "button-red" : "button-green"}
                            title={isNull(ping.down_time_detected_template) ? "Not configured" : "Configured"}
                            onClick={() => setSelected({
                                prop: "down_time_detected_template",
                                title: "Down time detected template for user team"
                            })}
                        >
                            <div>
                                Down time detected template for user team
                            </div>
                            <div className="ml-3">
                                <CheckCircleIcon size={6}/>
                            </div>
                        </button>
                        <button
                            className={isNull(ping.down_time_ended_template) ? "button-red" : "button-green"}
                            title={isNull(ping.down_time_ended_template) ? "Not configured" : "Configured"}
                            onClick={() => setSelected({
                                prop: "down_time_ended_template",
                                title: "Down time ended template for user team"
                            })}
                        >
                            <div>
                                Down time ended template for user team
                            </div>
                            <div className="ml-3">
                                <CheckCircleIcon size={6}/>
                            </div>
                        </button>
                    </div>
                    <div className="flex justify-between mt-5">
                        <button
                            className={isNull(ping.slow_down_detected_template) ? "button-red" : "button-green"}
                            title={isNull(ping.slow_down_detected_template) ? "Not configured" : "Configured"}
                            onClick={() => setSelected({
                                prop: "slow_down_detected_template",
                                title: "Slow down detected template for user team"
                            })}
                        >
                            <div>
                                Slow down detected template for user team
                            </div>
                            <div className="ml-3">
                                <CheckCircleIcon size={6}/>
                            </div>
                        </button>
                        <button
                            className={isNull(ping.slow_down_ended_template) ? "button-red" : "button-green"}
                            title={isNull(ping.slow_down_ended_template) ? "Not configured" : "Configured"}
                            onClick={() => setSelected({
                                prop: "slow_down_ended_template",
                                title: "Slow down ended template for user team"
                            })}
                        >
                            <div>
                                Slow down ended template for user team
                            </div>
                            <div className="ml-3">
                                <CheckCircleIcon size={6}/>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-5">
                <div className="flex justify-between items-center">
                    <div>
                        <h6 className="text-lg">{selected.title}</h6>
                    </div>
                    <div>
                        <button className="badge-blue-square" onClick={fullScreen}>
                            <ZoomIcon size={6}/>
                        </button>
                    </div>
                </div>

                {
                    fullScreenOpen
                        ? null
                        : <TemplateEditor
                            key={selected.prop} prop={selected.prop}
                            initialContent={ping[selected.prop]}
                            pingId={pingId}
                        />
                }


            </div>
        </div>
    )
}