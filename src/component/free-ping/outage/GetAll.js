import React, {useEffect} from "react";
import getEnv from "../../../mixin/getEnv";
import database from "../../../database/database";
import Pagination from "../../util/pagination/Pagination";
import dateFormatter from "../../../mixin/global/dateFormatter";
import isNull from "../../../mixin/global/isNull";
import StatisticByMonth from "../statistic/StatisticByMonth";

export default function () {
    useEffect(() => {
        setTimeout(() => {
            const buttons = document.getElementsByTagName("button");

            for (let i = 0; i < buttons.length; i++) {
                if (buttons[0].innerText === "Opened") {

                    try {
                        buttons[0].click();
                    } catch (e) {
                    }
                    break;
                }
            }
        }, 10);
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Outage</h4>
                </div>
                <div></div>
            </div>

            <Pagination
                name={"free-ping-incident"}
                row={{}}
                columns={[
                    {
                        key: "ID",
                        value: "incident_id",
                        searchInput: true,
                        comparator: "eq",
                        primary: true,
                        computedValue: data => {
                            return (
                                <span className="text-blue-500">
                                    #{data.incident_id}
                                </span>
                            )
                        }
                    },
                    {
                        key: "NAME",
                        value: "ping_title",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "OF",
                        value: "incident_of",
                        searchInput: true,
                        comparator: "eq",
                        computedValue: data => dateFormatter(data.incident_of)
                    },
                    {
                        key: "AT",
                        value: "incident_at",
                        searchInput: true,
                        comparator: "eq",
                        computedValue: data => isNull(data.incident_at) ? null : dateFormatter(data.incident_at),
                        searchButton: [
                            {
                                name: "Opened",
                                value: 3,
                                conditions: [
                                    `incident_at${encodeURIComponent("[")}eq${encodeURIComponent("]")}=null`
                                ]
                            },
                            {
                                name: "Closed",
                                value: 3,
                                conditions: [
                                    `incident_at${encodeURIComponent("[")}ne${encodeURIComponent("]")}=null`
                                ]
                            },
                        ]
                    },
                    {
                        key: "DURATION",
                        value: "incident_duration",
                        searchInput: true,
                        comparator: "supeq",
                        computedValue: data => data.incident_duration + " minutes"
                    }
                ]}
                fetch={{
                    url: getEnv("REACT_APP_API_URL") + '/api-free-ping/admin/paginations/incident',
                    options: {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    },
                    interval: 5000
                }}
            />

            <StatisticByMonth pingId={1}/>
        </>
    );
}