import useApi from "../../../api/auto/useApi";
import {useSelector} from "react-redux";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {useEffect} from "react";
import {
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import Box from "@mui/material/Box";
import {ArrowBack} from "@mui/icons-material";

export default function ({developerId, onClose}) {
    const {findOneBy, update} = useApi();
    const developer = useSelector(state => state.api?.["api-free-commit"]?.developers?.values[developerId]);

    useEffect(() => {
        findOneBy("api-free-commit", "developers", "id", developerId, "developer");
    }, []);

    const handleKeyDown = field => e => {
        if (e.key !== "Enter") return;
        e.stopPropagation();

        update("api-free-commit", "developers", developerId, field, {
            developer: {
                [field]: e.target.value
            }
        }, "admin");
    }

    const handleSelectChange = field => e => {
        update("api-free-commit", "developers", developerId, field, {
            developer: {
                [field]: e.target.value
            }
        }, "admin");
    }

    const handleCheckboxChange = field => e => {
        update("api-free-commit", "developers", developerId, field, {
            developer: {
                [field]: e.target.checked
            }
        }, "admin");
    }

    if (isNull(developer)) return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        label="Username"
                        variant="standard"
                        fullWidth
                        defaultValue={developer.username}
                        onKeyDown={handleKeyDown("username")}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Password"
                        variant="standard"
                        fullWidth
                        defaultValue={developer.password}
                        onKeyDown={handleKeyDown("password")}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Email"
                        variant="standard"
                        fullWidth
                        defaultValue={developer.email}
                        onKeyDown={handleKeyDown("email")}
                    />
                </Box>
                <Box mt={2}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="developer-role">Role</InputLabel>
                        <Select
                            labelId="developer-role"
                            label="Role"
                            onChange={handleSelectChange("roles")}
                            defaultValue={developer.roles}
                            multiple
                        >
                            <MenuItem value={"ROLE_ADMIN"}>ROLE_ADMIN</MenuItem>
                            <MenuItem value={"ROLE_DEVELOPER"}>ROLE_DEVELOPER</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Box mt={2}>
                    <FormControlLabel
                        control={<Checkbox
                            defaultChecked={developer.enabled}
                            onChange={handleCheckboxChange("enabled")}
                        />}
                        label="Enabled"
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
                        label="Github username"
                        variant="standard"
                        fullWidth
                        defaultValue={developer.github_username}
                        onKeyDown={handleKeyDown("github_username")}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        label="Gitlab username"
                        variant="standard"
                        fullWidth
                        defaultValue={developer.gitlab_username}
                        onKeyDown={handleKeyDown("gitlab_username")}
                    />
                </Box>
            </Grid>
        </Grid>
    )
}