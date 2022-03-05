import {useNavigate} from "react-router";
import Pagination from "../util/pagination/Pagination";
import getEnv from "../../mixin/getEnv";
import database from "../../database/database";

export default function GetAll() {
    const navigate = useNavigate();

    return (
        <>
            <h4 className="font-bold">Secrets</h4>
            <Pagination
                name={"secret"}

                row={{
                    onClick: data => {
                        navigate(`/secret/${data.secret_id}`)
                    }
                }}

                columns={[
                    {
                        key: "Id",
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
                        key: "Name",
                        value: "secret_name",
                        searchInput: true,
                        comparator: "contains"
                    },
                    {
                        key: "Scope",
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
                    url: getEnv("REACT_APP_API_URL") + '/developer/paginations/secret',
                    options: {
                        headers: {
                            Authorization: `Bearer ${database.read(database.TABLE_AUTHENTICATION, "access_token")}`
                        }
                    },
                    interval: 20000
                }}
            />

            {/**
             <table className="table table-auto">
             <thead>
             <tr>
             <th>Id</th>
             <th>Name</th>
             <th>Value</th>
             <th>Scope</th>
             </tr>
             </thead>
             <tbody>
             {
                    secrets.length === 0
                        ? (
                            <tr>
                                <td colSpan="4">No data available</td>
                            </tr>
                        )
                        : null
                }
             {
                    secrets.map(secret => (
                        <>
                            <tr key={secret.id}>
                                <td className="text-blue-500 hover:underline hover:cursor-pointer"
                                    onClick={() => openSecret(secret.id)}>#{secret.id}
                                </td>
                                <td>{secret.name}</td>
                                <td>*****</td>
                                <td>
                                    {
                                        secret.project_id === null
                                            ? <span className="text-red-500">GLOBAL</span>
                                            : (
                                                <span className="text-green-500">{getProject(secret.project_id).name}</span>
                                            )
                                    }
                                </td>
                            </tr>
                        </>
                    ))
                }
             </tbody>
             </table>
             **/}
        </>
    );
}
