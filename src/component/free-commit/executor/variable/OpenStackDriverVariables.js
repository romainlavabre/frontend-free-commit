import useApi from "../../../../api/auto/useApi";
import {useSelector} from "react-redux";
import {Alert, IconButton, Link, Table, TableBody, TableCell, TableHead, TableRow, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {useRef, useState} from "react";
import {Add, Delete, Save} from "@mui/icons-material";

export default function ({executorId}) {
    const {findOneBy, update} = useApi();
    const executor = useSelector(state => state.api?.["api-free-commit"]?.executors?.values[executorId]);
    const [openCreate, setOpenCreate] = useState(false);
    const keyInput = useRef();
    const valueInput = useRef();

    const handleKeyDown = variable => e => {
        if (e.key !== "Enter") return;

        const variables = {...executor.variables};

        variables[variable] = e.target.value;

        update("api-free-commit", "executors", executorId, "variables", {
            executor: {
                variables: variables
            }
        }, "admin");
    }

    const handleCreate = async () => {
        const variables = {...executor.variables};

        variables[keyInput.current.value] = valueInput.current.value;

        const res = await update("api-free-commit", "executors", executorId, "variables", {
            executor: {
                variables: variables
            }
        }, "admin");

        if (res) toggleOpenCreate(false)();
    }

    const handleDelete = variable => () => {
        const variables = {...executor.variables};

        delete variables[variable];

        update("api-free-commit", "executors", executorId, "variables", {
            executor: {
                variables: variables
            }
        }, "admin");
    }

    const toggleOpenCreate = o => () => setOpenCreate(o);

    return (
        <>
            <Box width="40%">
                <Alert severity={"info"}>
                    <Link
                        href={"#"}
                        target={"_blank"}
                    >
                        Read more about the open stack driver
                    </Link>
                </Alert>
            </Box>
            <Box mt={3}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Variable name</TableCell>
                            <TableCell>Value (Encrypted in database)</TableCell>
                            <TableCell>
                                <IconButton onClick={toggleOpenCreate(true)}>
                                    <Add/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.keys(executor.variables).map(key => (
                                <TableRow key={key}>
                                    <TableCell>{key}</TableCell>
                                    <TableCell>
                                        <TextField
                                            variant="outlined"
                                            defaultValue={executor.variables[key]}
                                            fullWidth
                                            size="small"
                                            onKeyDown={handleKeyDown(key)}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton onClick={handleDelete(key)}>
                                            <Delete/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))
                        }

                        {
                            openCreate
                                ? (
                                    <TableRow>
                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                inputRef={keyInput}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                variant="outlined"
                                                fullWidth
                                                size="small"
                                                inputRef={valueInput}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <IconButton onClick={handleCreate}>
                                                <Save/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                                : null
                        }
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}