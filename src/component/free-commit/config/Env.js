import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {useEffect, useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import api from "../../../api/api";

export default function () {
    const [envs, setEnvs] = useState(null);

    useEffect(async () => {
        setEnvs((await api.config.getEnv()));
    }, []);

    if (isNull(envs)) return null;

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Env</TableCell>
                    <TableCell>Value</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    Object.keys(envs).map(key => (
                        <TableRow key={key}>
                            <TableCell>{key}</TableCell>
                            <TableCell>{envs[key]}</TableCell>
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>
    )
}