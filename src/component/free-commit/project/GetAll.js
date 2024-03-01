import {useNavigate} from "react-router";
import React from "react";
import Pagination from "../../util/pagination/Pagination";
import getEnv from "../../../mixin/getEnv";
import database from "../../../database/database";
import dateFormatter from "../../../mixin/global/dateFormatter";
import LaunchManually from "./build/LaunchManually";
import PlusIcon from "../../util/icon/PlusIcon";
import isNull from "../../../mixin/global/isNull";

export default function GetAll() {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="font-bold">Projects</h4>
                </div>
                <div>
                    <button className="badge-green-square" onClick={() => navigate('/free-commit/project/create')}>
                        <PlusIcon size={6}/>
                    </button>
                </div>
            </div>

            <Pagination
                name="project"
                columns={[
                    {
                        key: "REF",
                        value: "project_id",
                        searchInput: true,
                        comparator: 'contains',
                        primary: true,
                        computedValue: data => (
                            <span className="text-blue-500">
                                #{data.project_id}
                            </span>
                        )

                    },
                    {
                        key: "NAME",
                        value: "project_name",
                        searchInput: true,
                        comparator: 'contains'
                    },
                    {
                        key: "LAST BUILD STATUS",
                        value: "build_last_exit_code",
                        searchInput: true,
                        comparator: 'eq',
                        computedValue: (data) => {
                            if (isNull(data.build_last_exit_code)) return null;

                            return (
                                <span className={data.build_last_exit_code === 0 ? "text-green-500" : "text-red-5000"}>
                                    {data.build_last_exit_code} ({data.build_last_exit_message !== null ? data.build_last_exit_message : 'OK'})
                                </span>
                            )
                        }
                    },
                    {
                        key: "LAST BUILD AT",
                        value: "build_last_created_at",
                        searchInput: true,
                        comparator: 'contains',
                        computedValue: data => isNull(data.build_last_created_at) ? null : dateFormatter(data.build_last_created_at)
                    },
                    {
                        key: "LAUNCH",
                        computedValue: data => <LaunchManually key={data.project_id} projectId={data.project_id}/>
                    }
                ]}
                row={{
                    onClick: data => {
                        navigate(`/free-commit/project/${data.project_id}`)
                    }
                }}
                fetch={{
                    url: getEnv('REACT_APP_API_URL') + '/api-free-commit/developer/paginations/project',
                    options: {
                        headers: {
                            Authorization: 'Bearer ' + database.read(database.TABLE_AUTHENTICATION, "access_token")
                        }
                    },
                    interval: 5000
                }}
            />
        </>
    );
}
