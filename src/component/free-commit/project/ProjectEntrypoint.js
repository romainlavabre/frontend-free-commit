import Pagination from "../../../package-react-wrapper/material/pagination/Pagination";
import PaginationConfig from "../../../package-react-wrapper/material/pagination/PaginationConfig";
import getEnv from "../../../mixin/getEnv";
import PaginationColumn from "../../../package-react-wrapper/material/pagination/PaginationColumn";
import Type from "../../../package-react-wrapper/material/pagination/Type";
import {Chip} from "@mui/material";
import {useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import Project from "./Project";

export default function () {
    const [selected, setSelected] = useState(3);

    if (!isNull(selected)) return <Project key={selected} projectId={selected} onClose={() => setSelected(null)}/>;

    return (
        <Pagination
            paginationConfig={
                new PaginationConfig()
                    .setId("project")
                    .setUrl(getEnv('REACT_APP_API_URL'))
                    .setUri('/api-free-commit/developer/paginations/project')
                    .setUseSnapshotRefresh(false)
                    .setFieldAsId("project_id")
                    .setOnRowClicked(row => setSelected(row.project_id))
                    .addPaginationColumn(
                        new PaginationColumn()
                            .setHeader("Ref")
                            .setField("project_id")
                            .setType(Type.NUMBER)
                    )
                    .addPaginationColumn(
                        new PaginationColumn()
                            .setHeader("Name")
                            .setField("project_name")
                            .setType(Type.STRING)
                    )
                    .addPaginationColumn(
                        new PaginationColumn()
                            .setHeader("Last build status")
                            .setField("build_last_exit_code")
                            .setType(Type.NUMBER)
                            .setValueCompiler(row => (
                                <Chip
                                    label={`${row.build_last_exit_code} (${row.build_last_exit_message !== null ? row.build_last_exit_message : (row.build_last_exit_code === 0 ? 'OK' : "Unknown error")})`}
                                    color={row.build_last_exit_code === 0 ? "success" : "error"}
                                />
                            ))
                    )
            }
        />
    )
}