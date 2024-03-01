import {useNavigate} from "react-router";
import Pagination from "../../util/pagination/Pagination";
import getEnv from "../../../mixin/getEnv";
import database from "../../../database/database";
import React from "react";
import PlusIcon from "../../util/icon/PlusIcon";

export default function User() {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Developer</h4>
                </div>
                <button className="badge-green-square" onClick={() => navigate('/free-commit/developer/create')}>
                    <PlusIcon size={8}/>
                </button>
            </div>
            <hr className="mx-auto w-8/12 my-5"/>

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
                    url: getEnv('REACT_APP_API_URL') + "/api-free-commit/developer/paginations/developer",
                    options: {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    },
                    interval: 20000
                }}
                row={{
                    onClick: data => {
                        navigate(`/free-commit/developer/${data.developer_id}`);
                    }
                }}

                name={"user"}
            />
        </>
    );
}
