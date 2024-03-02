import React from "react";
import MultipleCard from "../../../util/card/MultipleCard";
import TemplateBase from "./TemplateBase";

export default function ({pingId}) {
    return (
        <div>
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
                    <tr>
                        <td>incident_duration</td>
                        <td>Duration of incident in minute</td>
                        <td>$incident_duration</td>
                        <td>Yes</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-5">
                <MultipleCard
                    key={"details"}
                    items={[
                        {
                            title: "Down time template for technical team",
                            component: <TemplateBase prop={"down_time_technical_template"} pingId={pingId}/>
                        },
                        {
                            title: "Slow down template for technical team",
                            component: <TemplateBase prop={"slow_down_technical_template"} pingId={pingId}/>
                        },
                        {
                            title: "Down time detected template for user team",
                            component: <TemplateBase prop={"down_time_detected_template"} pingId={pingId}/>
                        },
                        {
                            title: "Down time ended template for user team",
                            component: <TemplateBase prop={"down_time_ended_template"} pingId={pingId}/>
                        },
                        {
                            title: "Slow down detected template for user team",
                            component: <TemplateBase prop={"slow_down_detected_template"} pingId={pingId}/>
                        },
                        {
                            title: "Slow down ended template for user team",
                            component: <TemplateBase prop={"slow_down_ended_template"} pingId={pingId}/>
                        }
                    ]}
                />
            </div>
        </div>
    )
}