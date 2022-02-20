import {useNavigate} from "react-router";
import Pagination from "../util/pagination/Pagination";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";

export default function User() {
    const navigate = useNavigate();

    return (
        <>
            <h4 className="font-bold">Users</h4>

            <Pagination
                columns={[
                    {
                        key: "Id",
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
                        key: "Username",
                        value: "user_username",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "Email",
                        value: "developer_email",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "Granted",
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
                        navigate(`/user/${data.developer_id}`);
                    }
                }}

                name={"user"}
            />
        </>
    );
}
