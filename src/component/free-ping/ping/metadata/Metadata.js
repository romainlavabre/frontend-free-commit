import UpdateEntity from "../../../util/form/UpdateEntity";
import React from "react";

export default function ({id}) {
    return (
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
    )
}