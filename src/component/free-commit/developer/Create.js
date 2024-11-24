import {useRef} from "react";
import useApi from "../../../api/auto/useApi";
import {Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Box from "@mui/material/Box";
import {Check} from "@mui/icons-material";

export default function ({onSuccess}) {
    const {create} = useApi();
    const emailInput = useRef();
    const usernameInput = useRef();
    const passwordInput = useRef();
    const githubUsernameInput = useRef();
    const gitlabUsername = useRef();
    const rolesInput = useRef();

    const submit = async () => {
        const payload = {
            developer: {
                username: usernameInput.current.value,
                password: passwordInput.current.value,
                github_username: githubUsernameInput.current.value,
                gitlab_username: gitlabUsername.current.value,
                roles: rolesInput.current.value
            }
        };

        const id = await create("api-free-commit", "developers", payload, "admin");

        if (typeof id === "number") onSuccess(id);
    }

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label="Username"
                        variant="standard"
                        fullWidth
                        inputRef={usernameInput}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Password"
                        variant="standard"
                        fullWidth
                        inputRef={passwordInput}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Email"
                        variant="standard"
                        fullWidth
                        inputRef={emailInput}
                    />
                </Box>
                <Box mt={2}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="developer-role">Role</InputLabel>
                        <Select
                            labelId="developer-role"
                            label="Role"
                            multiple
                            inputRef={rolesInput}
                            defaultValue={["ROLE_DEVELOPER"]}
                        >
                            <MenuItem value={"ROLE_ADMIN"}>ROLE_ADMIN</MenuItem>
                            <MenuItem value={"ROLE_DEVELOPER"}>ROLE_DEVELOPER</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label="Github username"
                        variant="standard"
                        fullWidth
                        inputRef={githubUsernameInput}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Gitlab username"
                        variant="standard"
                        fullWidth
                        inputRef={gitlabUsername}
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