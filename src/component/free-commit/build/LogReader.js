import Box from "@mui/material/Box";
import {CircularProgress, IconButton, Tooltip} from "@mui/material";
import {ArrowDropDown, ArrowRight, CheckCircle, DoDisturb, Download, Error, SkipNext} from "@mui/icons-material";
import api from "../../../api/api";
import useAlert from "../../../package-react-wrapper/use/useAlert";
import {useEffect, useRef, useState} from "react";
import useDownload from "../../../package-react-wrapper/use/useDownload";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import Typography from "@mui/material/Typography";
import ExecutedTime from "./ExecutedTime";
import {grey, red} from "@mui/material/colors";

export default function ({executorId}) {
    const alert = useAlert();
    const interval = useRef();
    const currentStep = useRef(-1);
    const lineNumber = useRef(0);
    const [logs, setLogs] = useState({});
    const [zoom, setZoom] = useState(null);
    const logsRef = useRef({});
    const download = useDownload();

    useEffect(() => {
        interval.current = setInterval(() => {
            fetch();
        }, executorId.includes("-") ? 1000 : 500)
    }, []);

    useEffect(() => {
        return () => clearInterval(interval.current);
    }, []);

    const fetch = async () => {
        const response = executorId.includes("-")
            ? await api.log.getExecutorLog(executorId, currentStep.current, lineNumber.current)
            : await api.log.getBuildLog(executorId, currentStep.current);

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

        //const logPanels = document.querySelectorAll('[data-ref="log-panel"]');

        //if (!isNull(logPanels) && logPanels.length > 0) {
        //    console.log(logPanels)
        //    logPanels[logPanels.length - 1].scrollIntoView({
        //        block: 'end',
        //    });
        //}

    }

    const kill = async () => {
        const isSuccess = await api.build.killExecuted(executorId);

        if (isSuccess) {
            alert.launch("Executor killed successfully");
            return;
        }

        alert.launch("Unable to kill executor", "error");
    }

    const getIcon = (key, index) => {
        if (index === Object.keys(logs).length - 1 && isNull(logs[key].closed_at)) {
            return <CircularProgress size={20} color={"warning"}/>;
        }

        if (!logs[key].success && !isNull(logs[key].success)) {
            return <Error color="error"/>;
        }

        if (logs[key].skipped) {
            return <SkipNext color={"warning"}/>;
        }

        return <CheckCircle color="success"/>;
    }

    const getLogsToShow = content => {
        const lines = content.split("\n");

        return lines.slice(Math.max(lines.length - 15, 0));
    }

    const handleDownload = key => () => {
        download(btoa(logs[key].content), "text/plain", `${key}.txt`);
    }

    return (
        <Box>
            <Box>
                <Tooltip title={"Kill build"} placement="top">
                    <IconButton onClick={kill}>
                        <DoDisturb/>
                    </IconButton>
                </Tooltip>
            </Box>
            <Box>
                {
                    Object.keys(logs).map((key, index) => (
                        <Box key={key + "-" + logs[key].closed_at} mt={2}>
                            <Box display="flex" alignItems="center">
                                <Box width={"5%"}>
                                    <IconButton onClick={() => zoom === key ? setZoom(null) : setZoom(key)}>
                                        {
                                            index === Object.keys(logs).length - 1 || zoom === key
                                                ? <ArrowDropDown/>
                                                : <ArrowRight/>
                                        }

                                    </IconButton>
                                </Box>
                                <Box width={"5%"}>
                                    <IconButton disabled>
                                        {getIcon(key, index)}
                                    </IconButton>
                                </Box>
                                <Typography width={"70%"} noWrap>
                                    {key}
                                </Typography>
                                <Box display="flex" justifyContent="end" width="15%">
                                    <ExecutedTime at={logs[key].start_at} lock={logs[key].closed_at}/>
                                </Box>
                                <Box width={"5%"}>
                                    <IconButton onClick={handleDownload(key)}>
                                        <Download/>
                                    </IconButton>
                                </Box>
                            </Box>
                            {
                                index === Object.keys(logs).length - 1 || zoom === key
                                    ? (
                                        <Box
                                            sx={{marginLeft: "5%", scrollbarWidth: "none"}}
                                            height={"40vh"}
                                            overflow={"auto"}
                                            data-ref="log-panel"
                                        >
                                            {
                                                getLogsToShow(logs[key].content).map((line, index) => {
                                                    if (line.substring(0, 10).toLowerCase().includes("error")) {
                                                        return (
                                                            <Typography
                                                                key={index}
                                                                fontSize={"small"}
                                                                color={red[500]}
                                                            >
                                                                {line}
                                                            </Typography>
                                                        );
                                                    }

                                                    return (

                                                        <Typography
                                                            fontSize={"small"}
                                                            color={grey[500]}
                                                        >
                                                            {line}
                                                        </Typography>
                                                    );
                                                })
                                            }
                                        </Box>
                                    )
                                    : null
                            }
                        </Box>
                    ))
                }
            </Box>
        </Box>
    )
}