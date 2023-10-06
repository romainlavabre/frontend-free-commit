import React, {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import {useDispatch} from "react-redux";
import PropTypes from "prop-types";
import {openAlert} from "../../../store/util";
import {useNavigate, useParams} from "react-router";
import CloseIcon from "../../util/icon/CloseIcon";
import isNull from "../../../mixin/global/isNull";
import ExecutedTime from "./executed/ExecutedTime";

export default function ExecutedBuild() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    const [executed, setExecuted] = useState([]);
    const intervalRef = useRef();

    useEffect(() => {
        fetchExecuted();

        intervalRef.current = setInterval(() => {
            fetchExecuted();
        }, 5000);
    }, []);

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const fetchExecuted = async () => {
        const executed = await api.build.getExecuteds();

        if (isNull(executed)) return;

        setExecuted(executed);
    }

    const kill = async executorId => {
        const isSuccess = await api.build.killExecuted(executorId);

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

    const openLog = executorId => {
        navigate(`/project/${id}/build/${executorId}`);
    }

    return (
        <>
            <div className="bg-light">
                <h4 className="text-center text-ovh text-3xl my-5">Current execution</h4>

                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th>Task</th>
                        <th>Project</th>
                        <td>Time</td>
                        <td>Kill</td>
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
                            <tr key={executed.executor_id}>
                                <td className="text-blue-500 hover:underline cursor-pointer"
                                    onClick={() => openLog(executed.executor_id)}>
                                    #{executed.executor_id}
                                </td>
                                <td className="text-green-500">
                                    {executed.project_name}
                                </td>
                                <td>
                                    <ExecutedTime at={executed.at}/>
                                </td>
                                <td>
                                    <button className="badge-red-square"
                                            onClick={() => kill(executed.executor_id)}>
                                        <CloseIcon size={6}/>
                                    </button>
                                </td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}

ExecutedBuild.prototype = {
    projectScope: PropTypes.number
}

