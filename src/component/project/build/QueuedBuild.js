import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import {useSelector} from "react-redux";

export default function QueuedBuild({projectScope}) {
    const [queued, setExecuted] = useState([]);
    const projects = useSelector(state => state.project.projects);
    const intervalRef = useRef();

    useEffect(() => {
        fetchExecuted();

        intervalRef.current = setInterval(() => {
            fetchExecuted();
        }, 5000);
    }, []);

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const fetchExecuted = async () => {
        const queued = await api.build.getQueueds();

        let result = [];

        if (projectScope === null) {
            result = queued;
        } else {
            result = queued.slice(queued => queued.project_id === projectScope);
        }

        setExecuted(result);
    }

    const getProject = id => {
        return projects.find(project => project.id === id);
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">Queued execution</h4>

                <table className="table table-auto">
                    <tr>
                        <th>Task</th>
                        <th>Project</th>
                    </tr>

                    {
                        queued.length === 0
                            ? (
                                <tr>
                                    <td colSpan="2">No data available</td>
                                </tr>
                            )
                            : null
                    }
                    {
                        queued.map(queued => (
                            <tr>
                                <td className="text-gray-400 animate-pulse cursor-wait">#{queued.executor_id}</td>
                                <td className="text-green-500">
                                    {getProject(queued.project_id).name}
                                </td>
                            </tr>
                        ))
                    }
                </table>
            </div>
        </>
    );
}

QueuedBuild.prototype = {
    projectScope: PropTypes.number
}

