import {useNavigate} from "react-router";
import Pagination from "../../util/pagination/Pagination";
import getEnv from "../../../mixin/getEnv";
import database from "../../../database/database";
import React, {useEffect} from "react";
import PlusIcon from "../../util/icon/PlusIcon";
import isNull from "../../../mixin/global/isNull";
import dateFormatter from "../../../mixin/global/dateFormatter";

export default function () {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            const buttons = document.getElementsByTagName("button");

            for (let i = 0; i < buttons.length; i++) {
                if (buttons[i].innerText === "Opened") {

                    try {
                        buttons[i].click();
                    } catch (e) {
                        console.log(e)
                    }
                    break;
                }
            }
        }, 100);
    }, []);

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Ticket</h4>
                </div>
                <div>
                    <button className="badge-green-square" onClick={() => navigate('/free-ping/ticket/create')}>
                        <PlusIcon size={8}/>
                    </button>
                </div>
            </div>
            <Pagination
                name={"free-ping-ticket"}
                row={{
                    onClick: data => {
                        navigate(`/free-ping/ticket/${data.ticket_id}`)
                    }
                }}
                columns={[
                    {
                        key: "ID",
                        value: "ticket_id",
                        searchInput: true,
                        comparator: "eq",
                        primary: true,
                        computedValue: data => {
                            return (
                                <span className="text-blue-500">
                                    #{data.ticket_id}
                                </span>
                            )
                        }
                    },
                    {
                        key: "NAME",
                        value: "ticket_title",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "DATE",
                        value: "ticket_created_at",
                        computedValue: data => dateFormatter(data.ticket_created_at)
                    },
                    {
                        key: "OPENED",
                        value: "ticket_closed_at",
                        computedValue: data => (
                            <span className={isNull(data.ticket_closed_at) ? "badge-green" : "badge-red"}>
                                {isNull(data.ticket_closed_at) ? "Yes" : "No"}
                            </span>
                        ),
                        searchButton: [
                            {
                                name: "Opened",
                                conditions: [
                                    `closed_at${encodeURIComponent("[")}eq${encodeURIComponent("]")}=null`
                                ]
                            },
                            {
                                name: "Closed",
                                conditions: [
                                    `closed_at${encodeURIComponent("[")}ne${encodeURIComponent("]")}=null`
                                ]
                            },
                        ]
                    }
                ]}
                fetch={{
                    url: getEnv("REACT_APP_API_URL") + '/api-free-ping/admin/paginations/ticket',
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
