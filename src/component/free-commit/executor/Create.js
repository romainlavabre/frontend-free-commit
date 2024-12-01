import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Check} from "@mui/icons-material";
import useApi from "../../../api/auto/useApi";
import {useRef} from "react";

export default function ({onSuccess}) {
    const {create} = useApi();
    const nameInput = useRef();
    const driverInput = useRef();

    const submit = async () => {
        const payload = {
            executor: {
                name: nameInput.current.value,
                driver: driverInput.current.value
            }
        };

        const id = await create("api-free-commit", "executors", payload, "admin");

        if (typeof id === "number") onSuccess(id);
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
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="driver">Driver</InputLabel>
                        <Select
                            labelId="driver"
                            label="Role"
                            defaultValue={"localDriver"}
                            inputRef={driverInput}
                        >
                            <MenuItem value={"localDriver"}>localDriver</MenuItem>
                            <MenuItem value={"openStackDriver"}>openStackDriver</MenuItem>
                        </Select>
                    </FormControl>
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