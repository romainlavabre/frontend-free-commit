import PropTypes from "prop-types";
import React, {useEffect, useRef, useState} from "react";
import api from "../../../../api/api";
import isNull from "../../../../mixin/global/isNull";
import CloseIcon from "../../../util/icon/CloseIcon";
import useAlert from "../../../../use/useAlert";

export default function QueuedBuild({projectScope}) {
    const alert = useAlert();
    const [queued, setExecuted] = useState([]);
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
            result = queued.filter(queued => queued.project_id == projectScope);
        }

        setExecuted(result);
    }

    const kill = async executorId => {
        const isSuccess = await api.build.killQueued(executorId);

        if (isSuccess) {
            alert.launch("Executor killed successfully");
            return;
        }

        alert.launch("Unable to kill executor", "error");
    }

    return (
        <>
            <div className="bg-light">
                <h4 className="text-center text-ovh text-3xl my-5">Queued tasks</h4>

                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th>Task</th>
                        <th>Project</th>
                        <th>Kill</th>
                    </tr>
                    {
                        !isNull(queued) && queued.length > 0
                            ? queued.map(queued => (
                                <tr key={queued.executor_id}>
                                    <td className="text-gray-400 animate-pulse cursor-wait">#{queued.executor_id}</td>
                                    <td className="text-green-500">{queued.project_name}</td>
                                    <td>
                                        <button className="badge-red-square"
                                                onClick={() => kill(queued.executor_id)}>
                                            <CloseIcon size={6}/>
                                        </button>
                                    </td>
                                </tr>
                            ))
                            : (
                                <tr>
                                    <td colSpan="2">No data available</td>
                                </tr>
                            )
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
}

QueuedBuild.prototype = {
    projectScope: PropTypes.number
}

