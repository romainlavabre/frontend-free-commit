import useApi from "../../../api/auto/useApi";
import {useSelector} from "react-redux";
import api from "../../../api/api";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {useEffect, useState} from "react";
import {Autocomplete, Button, Grid, TextField, Tooltip} from "@mui/material";
import Box from "@mui/material/Box";
import useSecurity from "../../../package-react-wrapper/use/useSecurity";
import {ArrowBack, Delete} from "@mui/icons-material";
import useConfirm from "../../../package-react-wrapper/use/useConfirm";

export default function ({secretId, onClose}) {
    const {findOneBy, update, remove} = useApi();
    const {confirmModal, managedConfirm} = useConfirm();
    const security = useSecurity();
    const secret = useSelector(state => state.api?.["api-free-commit"]?.secrets?.values[secretId]);
    const [projects, setProjects] = useState();

    useEffect(() => {
        findOneBy("api-free-commit", "secrets", "id", secretId, security.roles.includes("ROLE_ADMIN") ? "admin" : "developer");

        const fetchProject = async () => {
            setProjects((await api.project.pagination(100000)).data);
        }

        fetchProject();
    }, []);

    const handleKeyDown = field => e => {
        if (e.key !== "Enter") return;
        e.stopPropagation();

        update("api-free-commit", "secrets", secretId, field, {
            secret: {
                [field]: e.target.value
            }
        }, "admin");
    }

    const handleSelectChange = (field, value) => {
        update("api-free-commit", "secrets", secretId, field, {
            secret: {
                [field]: value
            }
        }, "admin");
    }

    const handleDelete = async () => {
        managedConfirm(
            "You will delete this secret",
            null,
            async () => {
                const isSuccess = await remove("api-free-commit", "secrets", secretId, "admin");

                if (isSuccess) {
                    onClose();
                }
            },
        )
    }

    if (isNull(projects) || isNull(secret)) return null;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Box>
                        <TextField
                            label="Name"
                            variant="standard"
                            fullWidth
                            defaultValue={secret.name}
                            onKeyDown={handleKeyDown("name")}
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
                            defaultValue={secret.value}
                            onKeyDown={handleKeyDown("value")}
                        />
                    </Box>
                    <Box mt={2}>
                        <Autocomplete
                            key={projects.length}
                            multiple
                            options={projects}
                            getOptionLabel={o => o.project_name}
                            getOptionKey={o => o.project_id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Projects"
                                    InputProps={{
                                        ...params.InputProps,
                                    }}
                                    variant={"standard"}
                                />
                            )}
                            defaultValue={projects.filter(o => secret.projects_id.includes(o.project_id))}
                            onChange={(e, val) => handleSelectChange("projects_id", val?.map(v => v.project_id) ?? [])}
                        />
                    </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Box display="flex" justifyContent="space-around">
                        <Button
                            startIcon={<Delete/>}
                            variant="contained"
                            size={"small"}
                            color={"error"}
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                        <Button startIcon={<ArrowBack/>} variant="contained" size={"small"} onClick={onClose}>
                            Back
                        </Button>
                    </Box>
                    <Box mt={2}>
                        <Tooltip title={"The characters will be escaped with \\"}>
                            <TextField
                                label="Escape char (sample : @,$,\)"
                                variant="standard"
                                fullWidth
                                defaultValue={secret.escape_char}
                                onKeyDown={handleKeyDown("escape_char")}
                            />
                        </Tooltip>
                    </Box>
                    <Box mt={2}>
                        <TextField
                            label="Environement"
                            variant="standard"
                            fullWidth
                            defaultValue={secret.env}
                            onKeyDown={handleKeyDown("env")}
                        />
                    </Box>
                </Grid>
            </Grid>
            {confirmModal}
        </>
    )
}