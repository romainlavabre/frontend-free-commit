import {
    Autocomplete,
    Button,
    Checkbox,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Tooltip
} from "@mui/material";
import Box from "@mui/material/Box";
import useApi from "../../../api/auto/useApi";
import {useSelector} from "react-redux";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {useEffect, useRef, useState} from "react";
import {Check} from "@mui/icons-material";

export default function ({onSuccess}) {
    const {findOneBy, findAll, create} = useApi();
    const developers = useSelector(state => state.api?.["api-free-commit"]?.developers?.values?.filter(developer => !isNull(developer)));
    const credentials = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values?.filter(credential => !isNull(credential)));
    const secrets = useSelector(state => state.api?.["api-free-commit"]?.secrets?.values?.filter(secret => !isNull(secret)));
    const executors = useSelector(state => state.api?.["api-free-commit"]?.executors?.values?.filter(executor => !isNull(executor)));
    const [copyFromId, setCopyFromId] = useState(null);
    const copyFrom = useSelector(state => state.api?.["api-free-commit"]?.projects?.values[copyFromId]);
    const nameInput = useRef();
    const descriptionInput = useRef();
    const repositoryInput = useRef();
    const keepNumberBuildInput = useRef();
    const branchInput = useRef();
    const specFilePathInput = useRef();
    const allowConcurrentExecutionInput = useRef();
    const developersIdInput = useRef();
    const secretsIdInput = useRef();
    const repositoryCredentialIdInput = useRef();
    const executorIdInput = useRef();


    useEffect(() => {
        findAll("api-free-commit", "credentials", "developer");
        findAll("api-free-commit", "developers", "developer");
        findAll("api-free-commit", "secrets", "developer");
        findAll("api-free-commit", "executors", "developer");
    }, []);

    useEffect(() => {
        if (isNull(copyFromId)) return;

        findOneBy("api-free-commit", "projects", "id", copyFromId, "developer");
    }, [copyFromId]);

    useEffect(() => {
        if (isNull(copyFrom)) return;

        repositoryCredentialIdInput.current = copyFrom.repository_credential_id;
        secretsIdInput.current = copyFrom.secrets_id;
    }, [JSON.stringify(copyFrom)]);

    const handleCopyFromKeyDown = e => {
        if (e.key !== "Enter") return;

        setCopyFromId(e.target.value)
    }


    const submit = async () => {
        const payload = {
            project: {
                name: nameInput.current.value,
                description: descriptionInput.current.value,
                repository: repositoryInput.current.value,
                keep_number_build: keepNumberBuildInput.current.value,
                branch: branchInput.current.value,
                spec_file_path: specFilePathInput.current.value,
                allow_concurrent_execution: allowConcurrentExecutionInput.current.checked,
                developers_id: developersIdInput.current,
                secrets_id: secretsIdInput.current,
                repository_credential_id: repositoryCredentialIdInput.current,
                executor_id: executorIdInput.current.value
            }
        };

        const id = await create("api-free-commit", "projects", payload, "admin");

        if (typeof id === "number") onSuccess(id);
    }

    if (isNull(developers) || isNull(credentials) || isNull(secrets)) return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Tooltip title={"Press ENTER to search"}>
                    <TextField
                        label={"Copy from (project id)"}
                        variant="standard"
                        onKeyDown={handleCopyFromKeyDown}
                        type={"number"}
                    />
                </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <TextField
                        key={JSON.stringify(copyFrom)}
                        label={"Name"}
                        variant="standard"
                        fullWidth
                        defaultValue={copyFrom?.name}
                        inputRef={nameInput}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        key={JSON.stringify(copyFrom)}
                        label={"Description"}
                        variant="standard"
                        fullWidth
                        multiline
                        minRows={4}
                        maxRows={8}
                        defaultValue={copyFrom?.description}
                        inputRef={descriptionInput}
                    />
                </Box>
                <Box mt={2}>
                    <TextField
                        key={JSON.stringify(copyFrom)}
                        label={"Number build to keep"}
                        variant="standard"
                        fullWidth
                        type="number"
                        defaultValue={copyFrom?.keep_number_build}
                        inputRef={keepNumberBuildInput}
                    />
                </Box>
                <Box mt={2}>
                    <Tooltip title={"All admins are allowed to launch a build"}>
                        <Autocomplete
                            key={developers.length + JSON.stringify(copyFrom)}
                            multiple
                            options={developers}
                            getOptionLabel={o => o.username}
                            getOptionKey={o => o.id}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Allowed developers"
                                    InputProps={{
                                        ...params.InputProps,
                                    }}
                                    variant={"standard"}
                                />
                            )}
                            defaultValue={developers.filter(o => copyFrom?.developers_id.includes(o.id)) ?? []}
                            onChange={(e, val) => developersIdInput.current = val?.map(v => v.id) ?? []}
                        />
                    </Tooltip>
                </Box>
                <Box mt={2}>
                    <FormControlLabel
                        key={JSON.stringify(copyFrom)}
                        control={<Checkbox
                            defaultChecked={copyFrom?.allow_concurrent_execution ?? false}
                        />}
                        label="Allow concurrent execution"
                        inputRef={allowConcurrentExecutionInput}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Box>
                    <Autocomplete
                        key={credentials.length + JSON.stringify(copyFrom)}
                        options={credentials}
                        getOptionLabel={o => o.name}
                        getOptionKey={o => o.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Source code credentials"
                                InputProps={{
                                    ...params.InputProps,
                                }}
                                variant={"standard"}
                            />
                        )}
                        defaultValue={credentials.find(o => copyFrom?.repository_credential_id === o.id)}
                        onChange={(e, val) => repositoryCredentialIdInput.current = val?.id}
                    />
                </Box>
                <Box mt={2}>
                    <Tooltip title={"SSH URL recommended"}>
                        <TextField
                            key={JSON.stringify(copyFrom)}
                            label={"Repository"}
                            variant="standard"
                            fullWidth
                            defaultValue={copyFrom?.repository}
                            inputRef={repositoryInput}
                        />
                    </Tooltip>
                </Box>
                <Box mt={2}>
                    <Tooltip
                        title={"The branch allows you to know if this project is affected by a webhook event, Free-Commit will automatically extract to this branch in the docker container"}>
                        <TextField
                            key={JSON.stringify(copyFrom)}
                            label={"Branch"}
                            variant="standard"
                            fullWidth
                            defaultValue={copyFrom?.branch}
                            inputRef={branchInput}
                        />
                    </Tooltip>
                </Box>
                <Box mt={2}>
                    <Tooltip
                        title={"From the root of your project (sample : /.free-commit/live/pipeline.yaml)"}>
                        <TextField
                            key={JSON.stringify(copyFrom)}
                            label={"Deployment file path"}
                            variant="standard"
                            fullWidth
                            defaultValue={copyFrom?.spec_file_path}
                            inputRef={specFilePathInput}
                        />
                    </Tooltip>
                </Box>
                <Box mt={2}>
                    <Autocomplete
                        key={secrets.length + JSON.stringify(copyFrom)}
                        multiple
                        options={secrets}
                        getOptionLabel={o => o.name}
                        getOptionKey={o => o.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Environment"
                                InputProps={{
                                    ...params.InputProps,
                                }}
                                variant={"standard"}
                            />
                        )}
                        defaultValue={secrets.filter(o => copyFrom?.secrets_id.includes(o.id)) ?? []}
                        onChange={(e, val) => secretsIdInput.current = val?.map(v => v.id) ?? []}
                    />
                </Box>
                <Box mt={2}>
                    <FormControl fullWidth variant="standard">
                        <InputLabel id="driver">Executor</InputLabel>
                        <Select
                            key={JSON.stringify(copyFrom)}
                            labelId="driver"
                            label="Role"
                            defaultValue={!isNull(copyFrom) ? copyFrom.executor_id : executors.find(e => e.driver === "localDriver").id}
                            inputRef={executorIdInput}
                        >
                            {
                                executors.map(e => (
                                    <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                                ))
                            }
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