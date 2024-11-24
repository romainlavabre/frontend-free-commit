import {Button, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Check} from "@mui/icons-material";
import useApi from "../../../api/auto/useApi";
import {useRef} from "react";

export default function ({onSuccess}) {
    const {create} = useApi();
    const nameInput = useRef();
    const sshKeyInput = useRef();

    const submit = async () => {
        const payload = {
            credential: {
                name: nameInput.current.value,
                ssh_key: sshKeyInput.current.value
            }
        };

        const id = await create("api-free-commit", "credentials", payload, "admin");

        if (typeof id === "number") onSuccess();
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label={"Name"}
                        variant="standard"
                        fullWidth
                        inputRef={nameInput}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label={"SSH Key"}
                        variant="standard"
                        fullWidth
                        multiline
                        minRows={10}
                        inputRef={sshKeyInput}
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