import {useNavigate} from "react-router";
import PlusIcon from "../../util/icon/PlusIcon";
import Pagination from "../../util/pagination/Pagination";
import getEnv from "../../../mixin/getEnv";
import database from "../../../database/database";
import React from "react";

export default function () {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Page</h4>
                </div>
                <div>
                    <button className="badge-green-square" onClick={() => navigate('/free-ping/page/create')}>
                        <PlusIcon size={8}/>
                    </button>
                </div>
            </div>
            <Pagination
                name={"free-ping-page"}
                row={{
                    onClick: data => {
                        navigate(`/free-ping/page/${data.page_id}`)
                    }
                }}
                columns={[
                    {
                        key: "ID",
                        value: "page_id",
                        searchInput: true,
                        comparator: "eq",
                        primary: true,
                        computedValue: data => {
                            return (
                                <span className="text-blue-500">
                                    #{data.page_id}
                                </span>
                            )
                        }
                    },
                    {
                        key: "NAME",
                        value: "page_title",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "URI",
                        value: "page_uri",
                        searchInput: true,
                        comparator: "contains"
                    }
                ]}
                fetch={{
                    url: getEnv("REACT_APP_API_URL") + '/api-free-ping/admin/paginations/page',
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