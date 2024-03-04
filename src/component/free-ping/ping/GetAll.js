import {useNavigate} from "react-router";
import Pagination from "../../util/pagination/Pagination";
import getEnv from "../../../mixin/getEnv";
import database from "../../../database/database";
import React from "react";
import PlusIcon from "../../util/icon/PlusIcon";

export default function () {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Ping</h4>
                </div>
                <div>
                    <button className="badge-green-square" onClick={() => navigate('/free-ping/ping/create')}>
                        <PlusIcon size={8}/>
                    </button>
                </div>
            </div>
            <Pagination
                name={"free-ping-ping"}
                row={{
                    onClick: data => {
                        navigate(`/free-ping/ping/${data.ping_id}`)
                    }
                }}
                columns={[
                    {
                        key: "ID",
                        value: "ping_id",
                        searchInput: true,
                        comparator: "eq",
                        primary: true,
                        computedValue: data => {
                            return (
                                <span className="text-blue-500">
                                    #{data.ping_id}
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
                        key: "INTERVAL",
                        value: "ping_interval",
                        searchInput: true,
                        comparator: "eq",
                        computedValue: data => data.ping_interval + "s"
                    },
                    {
                        key: "DELAY SLOWDOWN",
                        value: "ping_slow_down_seconds",
                        searchInput: true,
                        comparator: "eq",
                        computedValue: data => data.ping_slow_down_seconds + "s"
                    }
                ]}
                fetch={{
                    url: getEnv("REACT_APP_API_URL") + '/api-free-ping/admin/paginations/ping',
                    options: {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    },
                    interval: 20000
                }}
            />
        </>
    );
}
