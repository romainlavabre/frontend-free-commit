import React, {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import {useDispatch, useSelector} from "react-redux";
import PropTypes from "prop-types";
import {openAlert} from "../../../store/util";

export default function ExecutedBuild({projectScope}) {
    const dispatch = useDispatch();
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
        const executed = await api.build.getExecuteds();

        let result = [];

        if (projectScope === null) {
            result = executed;
        } else {
            result = executed.slice(executed => executed.project_id === projectScope);
        }

        setExecuted(result);
    }

    const kill = async executorId => {
        const isSuccess = api.build.kill(executorId);

        if (isSuccess) {
            dispatch(openAlert({
                type: 'warning',
                title: 'Executor killed successfully'
            }));
            return;
        }

        dispatch(openAlert({
            type: 'error',
            title: 'Unable to kill executor'
        }));
    }

    const getProject = id => {
        return projects.find(project => project.id === id);
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">Current execution</h4>

                <table className="table table-auto">
                    <tr>
                        <th>Project</th>
                        <td>Status</td>
                        <td>Kill</td>
                    </tr>

                    {
                        executed.length === 0
                            ? (
                                <tr>
                                    <td colSpan="3">No data available</td>
                                </tr>
                            )
                            : null
                    }
                    {
                        executed.map(executed => (
                            <tr>
                                <td className="text-green-500">{getProject(executed.project_id).name}</td>
                                <td>
                                    <button disabled
                                            className="text-blue-500 hover:text-blue-600 animate-spin mx-5">
                                        <svg xmlns=" http://www.w3.org/2000/svg"
                                             className="h-8 w-8" fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                    </button>
                                </td>
                                <td>
                                    <button className="text-red-500 hover:text-red-600 mx-5"
                                            onClick={() => kill(executed.executor_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                             fill="currentColor">
                                            <path fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                  clipRule="evenodd"/>
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

ExecutedBuild.prototype = {
    projectScope: PropTypes.number
}

