import {useNavigate} from "react-router";
import Pagination from "../util/pagination/Pagination";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";
import React from "react";

export default function User() {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-end">
                <button className="bg-ovh rounded py-2 px-10" onClick={() => navigate('/developer/create')}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                         fill="currentColor">
                        <path
                            d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                    </svg>
                </button>
            </div>
            <h4 className="font-bold">Users</h4>

            <Pagination
                columns={[
                    {
                        key: "ID",
                        value: "developer_id",
                        searchInput: true,
                        comparator: "eq",
                        computedValue: data => {
                            return (
                                <span className="text-blue-500">
                                    #{data.developer_id}
                                </span>
                            )
                        },
                        primary: true
                    },
                    {
                        key: "USERNAME",
                        value: "user_username",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "EMAIL",
                        value: "developer_email",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "ROLE",
                        value: "user_role",
                        searchSelect: [
                            {
                                name: "ADMIN",
                                value: "ROLE_ADMIN",
                                comparator: "eq",
                            },
                            {
                                name: "DEVELOPER",
                                value: "ROLE_DEVELOPER",
                                comparator: "eq",
                            }
                        ],
                        computedValue: data => {
                            if (data.user_role === "ROLE_ADMIN") {
                                return (
                                    <span className="text-red-500">
                                        ADMIN
                                    </span>
                                );
                            }

                            if (data.user_role === "ROLE_DEVELOPER") {
                                return (
                                    <span className="text-blue-500">
                                        DEVELOPER
                                    </span>
                                );
                            }
                        }
                    }
                ]}
                fetch={{
                    url: getEnv('REACT_APP_API_URL') + "/api/developer/paginations/developer",
                    options: {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    },
                    interval: 20000
                }}
                row={{
                    onClick: data => {
                        navigate(`/developer/${data.developer_id}`);
                    }
                }}

                name={"user"}
            />
        </>
    );
}
