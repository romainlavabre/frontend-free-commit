import {useSelector} from "react-redux";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {useEffect} from "react";
import useApi from "../../../api/auto/useApi";
import {ArrowBack} from "@mui/icons-material";
import OpenStackDriverVariables from "./variable/OpenStackDriverVariables";
import LocalDriverVariables from "./variable/LocalDriverVariables";

export default function ({executorId, onClose}) {
    const {findOneBy, update} = useApi();
    const executor = useSelector(state => state.api?.["api-free-commit"]?.executors?.values[executorId]);

    useEffect(() => {
        findOneBy("api-free-commit", "executors", "id", executorId, "admin");
    }, []);

    const handleKeyDown = field => e => {
        if (e.key !== "Enter") return;

        e.stopPropagation();

        update("api-free-commit", "executors", executorId, field, {
            executor: {
                [field]: e.target.value
            }
        }, "admin");
    }

    if (isNull(executor)) return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label={"Name"}
                        variant="standard"
                        fullWidth
                        defaultValue={executor.name}
                        onKeyDown={handleKeyDown("name")}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box display="flex" justifyContent="end">
                    <Button startIcon={<ArrowBack/>} variant="contained" size={"small"} onClick={onClose}>
                        Back
                    </Button>
                </Box>
                <Box mt={2}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="driver">Driver</InputLabel>
                        <Select
                            labelId="driver"
                            label="Role"
                            defaultValue={executor.driver}
                            disabled
                        >
                            <MenuItem value={"localDriver"}>localDriver</MenuItem>
                            <MenuItem value={"openStackDriver"}>openStackDriver</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12}>

                {executor.driver === "localDriver" && <LocalDriverVariables executorId={executor.id}/>}
                {executor.driver === "openStackDriver" && <OpenStackDriverVariables executorId={executor.id}/>}
            </Grid>
        </Grid>
    )

}