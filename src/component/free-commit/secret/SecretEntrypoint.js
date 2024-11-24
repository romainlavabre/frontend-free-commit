import Pagination from "../../../package-react-wrapper/material/pagination/Pagination";
import PaginationConfig from "../../../package-react-wrapper/material/pagination/PaginationConfig";
import getEnv from "../../../mixin/getEnv";
import PaginationColumn from "../../../package-react-wrapper/material/pagination/PaginationColumn";
import Type from "../../../package-react-wrapper/material/pagination/Type";
import {Button, Chip} from "@mui/material";
import {useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {Add} from "@mui/icons-material";
import Modal from "../../../package-react-wrapper/material/modal/Modal";
import ModalConfig from "../../../package-react-wrapper/material/modal/ModalConfig";
import Secret from "./Secret";
import Create from "./Create";

export default function () {
    const [selected, setSelected] = useState(null);
    const [openCreate, setOpenCreate] = useState(false);

    const toggleOpenCreate = o => () => setOpenCreate(o);

    const handleCreationSucceeded = () => {
        setOpenCreate(false);
    }

    if (!isNull(selected)) return <Secret secretId={selected} onClose={() => setSelected(null)}/>;

    return (
        <>
            <Pagination
                paginationConfig={
                    new PaginationConfig()
                        .setId("secret")
                        .setUrl(getEnv('REACT_APP_API_URL'))
                        .setUri('/api-free-commit/developer/paginations/secret')
                        .setUseSnapshotRefresh(false)
                        .setReloadInterval(5000)
                        .setFieldAsId("secret_id")
                        .setOnRowClicked(row => setSelected(row.secret_id))
                        .addToolbarComponent((
                            <Button startIcon={<Add/>} size="small" onClick={toggleOpenCreate(true)}>
                                New
                            </Button>
                        ))
                        .addPaginationColumn(
                            new PaginationColumn()
                                .setHeader("Ref")
                                .setField("secret_id")
                                .setType(Type.NUMBER)
                        )
                        .addPaginationColumn(
                            new PaginationColumn()
                                .setHeader("Name")
                                .setField("secret_name")
                                .setType(Type.STRING)
                        )
                        .addPaginationColumn(
                            new PaginationColumn()
                                .setHeader("Environment")
                                .setField("secret_env")
                                .setType(Type.STRING)
                        )
                        .addPaginationColumn(
                            new PaginationColumn()
                                .setHeader("Scope")
                                .setField("secret_scope")
                                .setType(Type.STRING)
                                .setValueCompiler(row => (
                                    <Chip
                                        label={row.secret_scope === "PUBLIC" ? "PUBLIC" : "PRIVATE"}
                                        color={row.secret_scope === "PUBLIC" ? "warning" : "success"}
                                        size={"small"}
                                    />
                                ))
                        )
                }
            />

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