import {useRef} from "react";
import useApi from "../../../api/auto/useApi";
import {Button, Grid, TextField, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import {Check} from "@mui/icons-material";

export default function ({onSuccess}) {
    const {create} = useApi();
    const nameInput = useRef();
    const valueInput = useRef();
    const envInput = useRef();
    const escapeCharInput = useRef();

    const submit = async () => {
        const payload = {
            secret: {
                name: nameInput.current.value,
                value: valueInput.current.value,
                env: envInput.current.value,
                escape_char: escapeCharInput.current.value,
                projects_id: []
            }
        };

        const id = await create("api-free-commit", "secrets", payload, "admin");

        if (typeof id === "number") onSuccess();
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label="Name"
                        variant="standard"
                        fullWidth
                        inputRef={nameInput}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Value"
                        variant="standard"
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={8}
                        inputRef={valueInput}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Tooltip title={"The characters will be escaped with \\"}>
                        <TextField
                            label="Escape char (sample : @,$,\)"
                            variant="standard"
                            fullWidth
                            inputRef={escapeCharInput}
                        />
                    </Tooltip>
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Environement"
                        variant="standard"
                        fullWidth
                        inputRef={envInput}
                    />
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box display="flex" justifyContent="end">
                    <Button startIcon={<Check/>} variant="contained" size={"small"} onClick={submit}>
                        Create
                    </Button>
                </Box>
            </Grid>
        </Grid>
    )
}