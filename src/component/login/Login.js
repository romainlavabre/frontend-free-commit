import Box from "@mui/material/Box";
import {Button, Paper, TextField} from "@mui/material";
import {Login} from "@mui/icons-material";
import {useRef} from "react";
import api from "../../api/api";
import useAlert from "../../package-react-wrapper/use/useAlert";
import database from "../../package-react-wrapper/database/database";
import {useNavigate} from "react-router";

export default function () {
    const alert = useAlert();
    const navigate = useNavigate();
    const usernameInput = useRef();
    const passwordInput = useRef();

    const submit = async () => {
        const response = await api.authentication.authenticate(usernameInput.current.value, passwordInput.current.value);

        if (typeof response === "string") {
            alert.error(response);
            return;
        }


        const decodedToken = decodeAccessToken(response.access_token);

        database.write("authentication", 'access_token', response.access_token);
        database.write("authentication", 'roles', decodedToken.roles);
        database.write("authentication", 'id', decodedToken.sub);

        navigate('/free-commit/project');
    }

    const decodeAccessToken = token => {
        let base64Url = token.split('.')[1];
        let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    return (
        <Box mt={20} display="flex" justifyContent="center">
            <Box width={"30vw"}>
                <Paper elevation={10}>
                    <Box py={5} px={2}>
                        <Box>
                            <TextField
                                label="Username"
                                fullWidth
                                variant="standard"
                                inputRef={usernameInput}
                            />
                        </Box>

                        <Box mt={2}>
                            <TextField
                                label="Password"
                                fullWidth
                                variant="standard"
                                type="password"
                                inputRef={passwordInput}
                            />
                        </Box>
                        <Box mt={5} display="flex" justifyContent="end">
                            <Button startIcon={<Login/>} size="small" variant="contained" onClick={submit}>
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Box>
        </Box>
    )
}