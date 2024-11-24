import {Alert, Button, Link, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import useApi from "../../../api/auto/useApi";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {Add, ArrowRight} from "@mui/icons-material";
import Credential from "./Credential";
import Box from "@mui/material/Box";
import Modal from "../../../package-react-wrapper/material/modal/Modal";
import ModalConfig from "../../../package-react-wrapper/material/modal/ModalConfig";
import Create from "./Create";

export default function () {
    const {findAll} = useApi();
    const credentials = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values.filter(credential => !isNull(credential)));
    const [selected, setSelected] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

    useEffect(() => {
        findAll("api-free-commit", "credentials", "developer");
    }, []);

    const toggleOpenCreate = o => () => setOpenCreate(o);

    if (!isNull(selected)) return <Credential credentialId={selected} onClose={() => setSelected(null)}/>;

    if (isNull(credentials)) return null;

    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems={"center"} width={"100%"}>
                <Box>
                    <Alert severity={"info"}>
                        <Link
                            href={"https://romain.gitbook.io/free-commit/configure/provider-credentials"}
                            target={"_blank"}
                        >
                            Read more about the credentials
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
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            credentials.map(c => (
                                <TableRow key={c.id}>
                                    <TableCell>{c.id}</TableCell>
                                    <TableCell>{c.name}</TableCell>
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