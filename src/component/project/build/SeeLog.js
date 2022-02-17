import {useParams} from "react-router";
import React, {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import isNull from "../../../mixin/isNull";
import {useDispatch} from "react-redux";
import {openAlert} from "../../../store/util";

export default function SeeLog() {
    const {buildId, id} = useParams();
    const dispatch = useDispatch();
    const [logs, setLogs] = useState('');
    const [isDynamic, setDynamic] = useState(true);
    const intervalRef = useRef();

    useEffect(async () => {
        if (!buildId.includes('-')) {
            const build = await api.build.findById(buildId);

            setLogs(build.output);
            setDynamic(false);
        } else {
            fetchLog();
            intervalRef.current = setInterval(() => {
                fetchLog();
            }, 3000);
        }
    }, []);

    useEffect(() => () => {
        if (intervalRef.current === null) {
            return;
        }

        clearInterval(intervalRef.current)
    }, []);

    const fetchLog = async () => {
        const output = await api.build.getOutput(buildId);

        if (isNull(output)) {
            dispatch(openAlert({
                type: 'info',
                title: 'Build complete'
            }));
            clearInterval(intervalRef.current);
            setDynamic(false);
            return;
        }

        setLogs(output);

        let firstAppointment = document.getElementsByClassName('log');

        if (firstAppointment !== null && firstAppointment.length !== 0) {
            if (firstAppointment[0] !== undefined) {
                firstAppointment = firstAppointment[0];
            }

            firstAppointment.focus();

            firstAppointment.scrollIntoView({
                block: 'end',
            });
        }
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">Logs</h4>

                {
                    isDynamic
                        ? (
                            <button disabled
                                    className="text-blue-500 animate-spin">
                                <svg xmlns=" http://www.w3.org/2000/svg"
                                     className="h-10 w-10" fill="none"
                                     viewBox="0 0 24 24"
                                     stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                </svg>
                            </button>
                        )
                        : 'Build complete'
                }
                <div
                    className="border-2 border-fairfair px-3 overflow-y-scroll text-xl shadow-inner shadow-color-white bg-console"
                    style={{maxHeight: '600px'}}>

                    <div className="log" dangerouslySetInnerHTML={{
                        __html: logs.split('\n').join('<br/>')
                    }}>

                    </div>

                </div>
            </div>
        </>
    )
        ;
}
