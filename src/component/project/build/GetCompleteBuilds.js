import React, {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import {useNavigate, useParams} from "react-router";
import dateFormatter from "../../../mixin/dateFormatter";

export default function GetCompleteBuilds() {
    const {id} = useParams();
    const navigate = useNavigate();
    const [builds, setBuilds] = useState([]);
    const intervalRef = useRef();

    useEffect(async () => {
        fetchBuild();

        intervalRef.current = setInterval(() => {
            fetchBuild();
        }, 5000);
    }, []);

    const fetchBuild = async () => {
        const builds = await api.build.findAllByProject(id);

        builds.sort((b1, b2) => {
            return b1.id < b2.id
                ? 1
                : -1;
        })
        setBuilds(builds);
    }

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const getMinutes = (build) => {
        const d2 = new Date(build.completed_at);
        const d1 = new Date(build.created_at);
        const diffMs = +d2 - +d1;
        const diffMins = Math.floor((diffMs / 1000) / 60);

        return diffMins;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">Completed builds</h4>

                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th>Ref</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Duration</th>
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
                                <td className="text-blue-500 cursor-pointer hover:underline"
                                    onClick={() => navigate(`/project/${id}/build/${build.id}`)}>
                                    #{build.id}
                                </td>
                                <td className={build.exit_code !== 0 ? 'text-red-500' : 'text-green-500'}>
                                    {build.exit_code} ({build.exit_message !== null ? build.exit_message : 'No message available'})
                                </td>
                                <td>{dateFormatter(build.created_at)}</td>
                                <td className="italic">{getMinutes(build)} mn</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}
