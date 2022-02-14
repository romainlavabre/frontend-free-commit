import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import {useSelector} from "react-redux";

export default function QueuedBuild({projectScope}) {
    const [executed, setExecuted] = useState([]);
    const projects = useSelector(state => state.project.projects);
    const intervalRef = useRef();

    useEffect(() => {
        fetchExecuted();

        const interval = setInterval(() => {
            fetchExecuted();
        }, 5000);
        intervalRef.current = interval;
    }, []);

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const fetchExecuted = async () => {
        const executed = await api.build.getQueueds();

        let result = [];

        if (projectScope === null) {
            result = executed;
        } else {
            result = executed.slice(executed => executed.project_id === projectScope);
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
                        <th>Project</th>
                    </tr>

                    {
                        executed.length === 0
                            ? (
                                <tr>
                                    <td colSpan="4">No data available</td>
                                </tr>
                            )
                            : null
                    }
                    {
                        executed.map(executed => (
                            <tr>
                                <td className="text-green-500 flex justify-center border-none">
                                    {getProject(executed.project_id).name}

                                    <button disabled className="text-green-500 animate-pulse transition mx-10">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-8 w-8" fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                    </button>
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

