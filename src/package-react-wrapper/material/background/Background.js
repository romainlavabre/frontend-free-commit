import useEventDispatcher from "../../use/useEventDispatcher";
import {useEffect, useRef, useState} from "react";
import isNull from "../../mixin/isNull";
import Box from "@mui/material/Box";
import {Button, CircularProgress, IconButton, SnackbarContent, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {CheckCircle, Close} from "@mui/icons-material";
import {grey} from "@mui/material/colors";
import Modal from "../modal/Modal";
import ModalConfig from "../modal/ModalConfig";
import useHelper from "../../use/useHelper";
import Details from "./Details";

/**
 * Listen event start-process <br/>
 *
 * Code sample:
 * <code>
 *
 *     // Launcher
 *     eventDispatcher.launcher("start-process", {
 *         name: "Facture à facturer",
 *         component: (onTerminate, onNewLog) => {
 *             return <Test onTerminate={onTerminate} onNewLog={onNewLog}/>;
 *         }
 *     });
 * </code>
 *
 * And in the process:
 * <code>
 *
 *     // Call on new log
 *     onNewLog({
 *         color: green[400],
 *         content: "Facture " + helper.uuid()
 *     });
 *
 *     // Call on process terminate
 *     onTerminate();
 * </code>
 * @return {JSX.Element}
 */
export default function () {
    const helper = useHelper();
    const eventDispatcher = useEventDispatcher();
    const [buffer, setBuffer] = useState(null);
    const [processList, setProcessList] = useState([]);
    const processListCopy = useRef([]);
    const [logs, setLogs] = useState({});
    const logsCopy = useRef({});
    const [openDetails, setOpenDetails] = useState(null);

    useEffect(() => {
        const receipt = e => {
            if (isNull(e.data.name)) {
                console.warn("[BACKGROUND] Process name required");
                return;
            }

            setBuffer(e.data);
        }

        eventDispatcher.subscribe("start-process", receipt);

        return () => eventDispatcher.subscribe("start-process", receipt);
    }, []);

    useEffect(() => {
        if (isNull(buffer)) return;

        const res = [...processList];
        buffer.inProgress = true;
        buffer.id = helper.uuid();
        res.push(buffer)
        setBuffer(null);

        const res2 = {...logs};
        res2[buffer.id] = [];

        setLogs(res2);
        setTimeout(() => {
            setProcessList(res);
        }, 100);

    }, [JSON.stringify(buffer)]);

    useEffect(() => {
        processListCopy.current = processList;
    }, [JSON.stringify(processList)]);

    useEffect(() => {
        logsCopy.current = logs;
    }, [JSON.stringify(logs)]);

    const handleDelete = id => () => {
        const res = {...logs};
        delete res[id];
        setLogs(res);

        const res2 = processList.filter(pl => pl.id !== id);
        setProcessList(res2);
    }

    return (
        <Box position="fixed" zIndex={999999} right={10} bottom={10}>
            <Stack spacing={2} sx={{maxWidth: 600}}>
                {
                    processList.map(pl => (
                        <SnackbarContent
                            key={pl.id}
                            sx={{background: grey[900]}}
                            message={(
                                <Box>
                                    <Box display="flex" justifyContent="space-between" alignItems="center">
                                        <Box>
                                            <Typography color={"white"}>
                                                Process {pl.name.toLowerCase()}
                                            </Typography>
                                        </Box>
                                        <Box ml={2}>
                                            {
                                                pl.inProgress
                                                    ? <CircularProgress size={20} color={"warning"}/>
                                                    : <CheckCircle fontSize={"small"} color={"info"}/>
                                            }
                                        </Box>
                                    </Box>
                                    <Box visibility={"hidden"}>
                                        {
                                            pl.component(
                                                () => {
                                                    const res = [...processListCopy.current];
                                                    res.find(i => i.id === pl.id).inProgress = false;
                                                    setProcessList(res);
                                                },
                                                log => {
                                                    const res = {...logsCopy.current};
                                                    res[pl.id].push(log);
                                                    setLogs(res);
                                                }
                                            )
                                        }
                                    </Box>
                                </Box>
                            )}
                            action={(
                                <Box>
                                    <Button color="success" onClick={() => setOpenDetails(pl.id)}>
                                        Détails
                                    </Button>
                                    {
                                        !pl.inProgress
                                            ? (
                                                <IconButton color={"error"} onClick={handleDelete(pl.id)}>
                                                    <Close/>
                                                </IconButton>
                                            )
                                            : null
                                    }
                                </Box>
                            )}
                        />

                    ))
                }
            </Stack>

            {
                !isNull(openDetails)
                    ? (
                        <Modal
                            modalConfig={
                                new ModalConfig()
                                    .setOnClose(() => setOpenDetails(null))
                                    .setComponent(<Details key={logs[openDetails]?.length} logs={logs[openDetails]}/>)
                            }
                        />
                    )
                    : null
            }
        </Box>
    )
}