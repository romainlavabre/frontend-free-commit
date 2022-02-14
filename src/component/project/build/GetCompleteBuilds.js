import React, {useEffect, useState} from "react";
import api from "../../../api/api";
import {useParams} from "react-router";
import dateFormatter from "../../../mixin/dateFormatter";

export default function GetCompleteBuilds() {
    const {id} = useParams();
    const [builds, setBuilds] = useState([]);

    useEffect(async () => {
        const builds = await api.build.findAllByProject(id);

        setBuilds(builds);
    }, []);

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">Completed builds</h4>

                <table className="table table-auto">
                    <tr>
                        <th>Ref</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Time</th>
                    </tr>

                    {
                        builds.length === 0
                            ? (
                                <tr>
                                    <td colSpan="4">No data available</td>
                                </tr>
                            )
                            : null
                    }
                    {
                        builds.map(build => (
                            <tr>
                                <td>{build.id}</td>
                                <td>{build.exit_code}</td>
                                <td>{dateFormatter(build.created_at)}</td>
                                <td>{build.id}</td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </>
    );
}
