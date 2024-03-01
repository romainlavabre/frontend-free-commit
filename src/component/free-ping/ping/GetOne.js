import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import BackIcon from "../../util/icon/BackIcon";
import UpdateEntity from "../../util/form/UpdateEntity";
import Template from "./Template";
import useApi from "../../../api/auto/useApi";

export default function () {
    const {findOneBy} = useApi();
    const navigate = useNavigate();
    const {id} = useParams();
    const ping = useSelector(state => state.api?.["api-free-ping"]?.pings?.values[id]);

    useEffect(() => {
        findOneBy("api-free-ping", "pings", "id", id, "admin");
    }, []);

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-center text-3xl">{ping?.title}</h4>
                </div>
                <div>
                    <button className="badge-blue-square ml-3" onClick={() => navigate(`/free-ping/ping`)}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <UpdateEntity
                        subject="pings"
                        id={id}
                        service="api-free-ping"
                        role="admin"
                        fields={[
                            {
                                title: "Title",
                                name: "title",
                                type: "text"
                            },
                            {
                                title: "Interval (in seconds)",
                                name: "interval",
                                type: "number"
                            },
                            {
                                title: "Delay for slowdown (in seconds)",
                                name: "slow_down_seconds",
                                type: "number"
                            }
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        subject="pings"
                        id={id}
                        service="api-free-ping"
                        role="admin"
                        fields={[
                            {
                                title: "Ping url",
                                name: "ping_url",
                                type: "text"
                            }
                        ]}
                    />
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <Template pingId={id}/>
        </div>
    );
}