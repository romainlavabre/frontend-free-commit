import useApi from "../../../api/auto/useApi";
import {useSelector} from "react-redux";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Alert, Button, Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {Add, ArrowRight} from "@mui/icons-material";
import Modal from "../../../package-react-wrapper/material/modal/Modal";
import ModalConfig from "../../../package-react-wrapper/material/modal/ModalConfig";
import Create from "./Create";
import Executor from "./Executor";

export default function () {
    const {findAll} = useApi();
    const executors = useSelector(state => state.api?.["api-free-commit"]?.executors?.values.filter(credential => !isNull(credential)));
    const [selected, setSelected] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

    useEffect(() => {
        findAll("api-free-commit", "executors", "admin");
    }, []);

    const toggleOpenCreate = o => () => setOpenCreate(o);

    if (isNull(executors)) return null;

    if (!isNull(selected)) return <Executor executorId={selected} onClose={() => setSelected(null)}/>;

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems={"center"} width={"100%"}>
                <Box>
                    <Alert severity={"info"}>
                        <Link
                            href={"#"}
                            target={"_blank"}
                        >
                            Read more about the executors
                        </Link>
                    </Alert>
                </Box>
                <Box>
                    <Button startIcon={<Add/>} onClick={toggleOpenCreate(true)}>
                        New
                    </Button>
                </Box>
            </Box>
            <Box mt={2}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Driver</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            executors.map(c => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.name}</TableCell>
                                    <TableCell>{c.driver}</TableCell>
                                    <TableCell>
                                        <Button
                                            startIcon={<ArrowRight/>}
                                            variant="contained"
                                            size={"small"}
                                            onClick={() => setSelected(c.id)}
                                        >
                                            Go
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>

            {
                openCreate
                    ? (
                        <Modal
                            modalConfig={
                                new ModalConfig()
                                    .setOnClose(toggleOpenCreate(false))
                                    .setComponent(<Create onSuccess={toggleOpenCreate(false)}/>)
                            }
                        />
                    )
                    : null
            }
        </>
    )
}