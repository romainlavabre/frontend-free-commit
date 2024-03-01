import {useNavigate} from "react-router";
import Pagination from "../util/pagination/Pagination";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";
import React from "react";
import PlusIcon from "../util/icon/PlusIcon";

export default function GetAll() {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Secrets</h4>
                </div>
                <div>
                    <button className="badge-green-square" onClick={() => navigate('/secret/create')}>
                        <PlusIcon size={8}/>
                    </button>
                </div>
            </div>
            <Pagination
                name={"secret"}
                row={{
                    onClick: data => {
                        navigate(`/secret/${data.secret_id}`)
                    }
                }}
                columns={[
                    {
                        key: "ID",
                        value: "secret_id",
                        searchInput: true,
                        comparator: "eq",
                        primary: true,
                        computedValue: data => {
                            return (
                                <span className="text-blue-500">
                                    #{data.secret_id}
                                </span>
                            )
                        }
                    },
                    {
                        key: "NAME",
                        value: "secret_name",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "ENV",
                        value: "secret_env",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "SCOPE",
                        value: "secret_scope",
                        searchInput: true,
                        comparator: "contains",
                        computedValue: data => {
                            if (data.secret_scope === "PUBLIC") {
                                return (
                                    <span className="text-red-500">
                                        PUBLIC
                                    </span>
                                );
                            } else {
                                return (
                                    <span className="text-green-500">
                                        PRIVATE
                                    </span>
                                );
                            }
                        }
                    }
                ]}
                fetch={{
                    url: getEnv("REACT_APP_API_URL") + '/api-free-commit/developer/paginations/secret',
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
