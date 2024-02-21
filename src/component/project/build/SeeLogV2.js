import React, {useEffect, useRef, useState} from "react";
import {useNavigate, useParams} from "react-router";
import api from "../../../api/api";
import isNull from "../../../mixin/global/isNull";
import BackIcon from "../../util/icon/BackIcon";
import SpinnerV2 from "../../util/loader/SpinnerV2";
import CheckCircleIcon from "../../util/icon/CheckCircleIcon";
import ErrorCircleIcon from "../../util/icon/ErrorCircleIcon";
import DownloadIcon from "../../util/icon/DownloadIcon";
import useDownload from "../../../use/useDownload";
import EyeIcon from "../../util/icon/EyeIcon";
import StopCircleIcon from "../../util/icon/StopCircleIcon";

export default function () {
    const navigate = useNavigate();
    const {buildId} = useParams();
    const interval = useRef();
    const currentStep = useRef(-1);
    const lineNumber = useRef(0);
    const [logs, setLogs] = useState({});
    const [zoom, setZoom] = useState({});
    const logsRef = useRef({});
    const download = useDownload();

    useEffect(() => {
        interval.current = setInterval(() => {
            fetch();
        }, buildId.includes("-") ? 1000 : 500)
    }, []);

    useEffect(() => {
        return () => clearInterval(interval.current);
    }, []);

    const fetch = async () => {
        const response = buildId.includes("-")
            ? await api.log.getExecutorLog(buildId, currentStep.current, lineNumber.current)
            : await api.log.getBuildLog(buildId, currentStep.current);

        if (isNull(response)) {
            clearInterval(interval.current);
            return;
        }

        const result = logsRef.current;

        currentStep.current = response.step;
        lineNumber.current = response.line_number;

        if (isNull(result[currentStep.current])) {
            const lastKey = Object.keys(result)[Object.keys(result).length - 1];

            if (!isNull(lastKey) && isNull(result[lastKey].closed_at)) {
                result[lastKey].closed_at = response.start_at;
            }

            result[currentStep.current] = {
                start_at: response.start_at,
                closed_at: response.closed_at,
                content: response.log,
                success: response.success,
                skipped: response.skipped
            };
        } else {
            result[currentStep.current].content += response.log;
            result[currentStep.current].closed_at = response.closed_at;
            result[currentStep.current].success = response.success;
            result[currentStep.current].skipped = response.skipped;
        }


        setLogs({...result});
        logsRef.current = result;

        const logPanels = document.getElementsByClassName("log-panel");

        if (!isNull(logPanels)) {
            logPanels[logPanels.length - 1].focus();
            logPanels[logPanels.length - 1].scrollIntoView({
                block: 'end',
            });
        }

    }

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Logs</h4>
                </div>
                <div>
                    <button className="badge-blue-square" onClick={() => navigate("/project")}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>

            <hr className="mx-auto w-8/12 my-5"/>

            {
                Object.keys(logs).map((key, index) => (
                    <div key={key} className="mt-5 w-full">
                        <div className="grid grid-cols-12 gap-4">
                            <div className="col-span-4">
                                <div className="flex">
                                    {
                                        index === Object.keys(logs).length - 1 && isNull(logs[key].closed_at)
                                            ? (
                                                <div className="mr-5">
                                                    <SpinnerV2 color={"orange"} size={5}/>
                                                </div>
                                            )
                                            : (
                                                <>
                                                    {
                                                        logs[key].success === false
                                                            ? (
                                                                <div className="text-red-600 font-bold mr-5">
                                                                    <ErrorCircleIcon size={6}/>
                                                                </div>
                                                            )
                                                            : (
                                                                <>
                                                                    {
                                                                        logs[key].skipped
                                                                            ? (
                                                                                <div className="text-orange-500 font-bold mr-5">
                                                                                    <StopCircleIcon size={6}/>
                                                                                </div>
                                                                            )
                                                                            : (
                                                                                <div className="text-green-600 font-bold mr-5">
                                                                                    <CheckCircleIcon size={6}/>
                                                                                </div>
                                                                            )
                                                                    }
                                                                </>

                                                            )
                                                    }
                                                </>

                                            )
                                    }
                                    <div className="whitespace-nowrap">
                                        {key.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            <div className="col-span-4">
                                {
                                    !isNull(logs[key].closed_at)
                                        ? (
                                            <div className="ml-10 text-sm text-gray-500">
                                                Executed
                                                in {parseInt((new Date(logs[key].closed_at) - new Date(logs[key].start_at)) / 1000)} seconds
                                            </div>
                                        )
                                        : null
                                }
                            </div>

                            <div className="col-span-4">
                                <div className="flex justify-end">
                                    <button className="badge-blue-square mr-5"
                                            onClick={() => {
                                                const result = {...zoom};
                                                result[key] = !isNull(zoom[key]) ? !zoom[key] : true;
                                                setZoom(result);
                                            }}>
                                        <EyeIcon size={6}/>
                                    </button>
                                    <button className="badge-blue-square"
                                            onClick={() => download(btoa(logs[key].content), "text/plain", `${key}.txt`)}>
                                        <DownloadIcon size={6}/>
                                    </button>
                                </div>
                            </div>

                            <div
                                className={`col-span-12 rounded-lg overflow-y-scroll ${zoom[key] || isNull(logs[key].closed_at) ? "h-96 border-2 border-gray-600 text-gray-400" : "h-6 border-none text-gray-600"}`}>
                                <div className="log-panel break-words mx-5" dangerouslySetInnerHTML={{
                                    __html: logs[key].content?.split('\n').map(line => {
                                        if (line.substring(0, 10).toLowerCase().includes("error")) {
                                            return `<span class="text-red-600">${line}</span>`
                                        }

                                        return line;
                                    }).join('<br/>')
                                }}>

                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    );
}