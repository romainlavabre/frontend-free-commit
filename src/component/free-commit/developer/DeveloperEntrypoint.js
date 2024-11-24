import Pagination from "../../../package-react-wrapper/material/pagination/Pagination";
import PaginationConfig from "../../../package-react-wrapper/material/pagination/PaginationConfig";
import getEnv from "../../../mixin/getEnv";
import PaginationColumn from "../../../package-react-wrapper/material/pagination/PaginationColumn";
import Type from "../../../package-react-wrapper/material/pagination/Type";
import {Alert, Button, Chip, Link} from "@mui/material";
import {useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {Add} from "@mui/icons-material";
import Modal from "../../../package-react-wrapper/material/modal/Modal";
import ModalConfig from "../../../package-react-wrapper/material/modal/ModalConfig";
import Developer from "./Developer";
import Create from "./Create";
import Box from "@mui/material/Box";

export default function () {
    const [selected, setSelected] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

    const toggleOpenCreate = o => () => setOpenCreate(o);

    const handleCreationSucceeded = id => {
        setOpenCreate(false);
        setSelected(id);
    }

    if (!isNull(selected)) return <Developer developerId={selected} onClose={() => setSelected(null)}/>;

    return (
        <>
            <Box width={"30%"}>
                <Alert severity={"info"}>
                    <Link
                        href={"https://romain.gitbook.io/free-commit/configure/users"}
                        target={"_blank"}
                    >
                        Read more about the users
                    </Link>
                </Alert>
            </Box>
            <Box mt={3}>
                <Pagination
                    paginationConfig={
                        new PaginationConfig()
                            .setId("secret")
                            .setUrl(getEnv('REACT_APP_API_URL'))
                            .setUri('/api-free-commit/developer/paginations/developer')
                            .setUseSnapshotRefresh(false)
                            .setReloadInterval(5000)
                            .setFieldAsId("developer_id")
                            .setOnRowClicked(row => setSelected(row.developer_id))
                            .addToolbarComponent((
                                <Button startIcon={<Add/>} size="small" onClick={toggleOpenCreate(true)}>
                                    New
                                </Button>
                            ))
                            .addPaginationColumn(
                                new PaginationColumn()
                                    .setHeader("Ref")
                                    .setField("developer_id")
                                    .setType(Type.NUMBER)
                            )
                            .addPaginationColumn(
                                new PaginationColumn()
                                    .setHeader("Username")
                                    .setField("user_username")
                                    .setType(Type.STRING)
                            )
                            .addPaginationColumn(
                                new PaginationColumn()
                                    .setHeader("Email")
                                    .setField("developer_email")
                                    .setType(Type.STRING)
                            )
                            .addPaginationColumn(
                                new PaginationColumn()
                                    .setHeader("Roles")
                                    .setField("user_role")
                                    .setType(Type.STRING)
                                    .setValueCompiler(row => <Chip
                                        label={row.user_role}
                                        color={row.user_role === "ROLE_ADMIN" ? "warning" : "success"}
                                        size={"small"}
                                    />)
                            )
                    }
                />
            </Box>

            {
                openCreate
                    ? (
                        <Modal
                            modalConfig={
                                new ModalConfig()
                                    .setOnClose(toggleOpenCreate(false))
                                    .setComponent(<Create onSuccess={handleCreationSucceeded}/>)
                            }
                        />
                    )
                    : null
            }
        </>
    )
}