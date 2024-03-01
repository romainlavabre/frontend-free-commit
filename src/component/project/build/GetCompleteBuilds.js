import React, {useEffect, useRef} from "react";
import {useNavigate, useParams} from "react-router";
import dateFormatter from "../../../mixin/global/dateFormatter";
import {useSelector} from "react-redux";
import isNull from "../../../mixin/global/isNull";
import useApi from "../../../api/auto/useApi";

export default function GetCompleteBuilds() {
    const {findAllBy} = useApi();
    const {id} = useParams();
    const navigate = useNavigate();
    const builds = useSelector(state => state.api?.["api-free-commit"]?.builds?.values.filter(build => !isNull(build) && build.project_id == id)?.sort((b1, b2) => b1.id < b2.id ? 1 : -1))
    const intervalRef = useRef();

    useEffect(async () => {
        fetchBuild();

        intervalRef.current = setInterval(fetchBuild, 5000);
    }, []);

    const fetchBuild = () => {
        findAllBy("api-free-commit", "builds", "project_id", id, "developer");
    }

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const getMinutes = (build) => {
        const d2 = new Date(build.completed_at);
        const d1 = new Date(build.created_at);
        const diffMs = +d2 - +d1;
        const diffMins = Math.floor((diffMs / 1000) / 60);

        return diffMins;
    }

    if (isNull(builds)) return null;

    return (
        <>
            <h4 className="text-2xl mt-5">Completed builds</h4>

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
                        <tr key={build.id}>
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
        </>
    );
}
