import {useSelector} from "react-redux";
import {Button, Grid, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {useEffect} from "react";
import useApi from "../../../api/auto/useApi";
import {ArrowBack} from "@mui/icons-material";

export default function ({credentialId, onClose}) {
    const {findOneBy, update} = useApi();
    const credential = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values[credentialId]);

    useEffect(() => {
        findOneBy("api-free-commit", "credentials", "id", credentialId, "admin");
    }, []);

    const handleKeyDown = field => e => {
        if (e.key !== "Enter") return;

        e.stopPropagation();

        update("api-free-commit", "credentials", credentialId, field, {
            credential: {
                [field]: e.target.value
            }
        }, "admin");
    }

    if (isNull(credential)) return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label={"Name"}
                        variant="standard"
                        fullWidth
                        defaultValue={credential.name}
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
                    <TextField
                        label={"SSH Key"}
                        variant="standard"
                        fullWidth
                        multiline
                        minRows={10}
                        defaultValue={credential.ssh_key}
                        onKeyDown={handleKeyDown("ssh_key")}
                    />
                </Box>
            </Grid>
        </Grid>
    )

}