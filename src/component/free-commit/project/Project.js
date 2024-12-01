import useApi from "../../../api/auto/useApi";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import {
    Alert,
    Autocomplete,
    Button,
    Checkbox,
    Chip,
    FormControl,
    FormControlLabel,
    Grid,
    IconButton,
    InputLabel,
    Link,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Tooltip
} from "@mui/material";
import Box from "@mui/material/Box";
import Accordion from "../../../package-react-wrapper/material/accordion/Accordion";
import AccordionConfig from "../../../package-react-wrapper/material/accordion/AccordionConfig";
import AccordionUnity from "../../../package-react-wrapper/material/accordion/AccordionUnity";
import {ArrowBack, Cached, CopyAll, Delete, Help} from "@mui/icons-material";
import useClipboard from "../../../package-react-wrapper/use/useClipboard";
import {orange} from "@mui/material/colors";
import useAlert from "../../../package-react-wrapper/use/useAlert";
import useConfirm from "../../../package-react-wrapper/use/useConfirm";
import useHelper from "../../../package-react-wrapper/use/useHelper";
import ModalConfig from "../../../package-react-wrapper/material/modal/ModalConfig";
import LogReader from "../build/LogReader";
import Modal from "../../../package-react-wrapper/material/modal/Modal";
import LaunchBuild from "./LaunchBuild";

export default function ({projectId, onClose}) {
    const {confirmModal, managedConfirm} = useConfirm();
    const clipboard = useClipboard();
    const alert = useAlert();
    const helper = useHelper();
    const {findOneBy, findAll, findAllBy, update, remove} = useApi();
    const project = useSelector(state => state.api?.["api-free-commit"]?.projects?.values[projectId]);
    const developers = useSelector(state => state.api?.["api-free-commit"]?.developers?.values?.filter(developer => !isNull(developer)));
    const credentials = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values?.filter(credential => !isNull(credential)));
    const secrets = useSelector(state => state.api?.["api-free-commit"]?.secrets?.values?.filter(secret => !isNull(secret)));
    const builds = useSelector(state => state.api?.["api-free-commit"]?.builds?.values.filter(build => build?.project_id == projectId)?.sort((b1, b2) => b1.id < b2.id ? 1 : -1));
    const executors = useSelector(state => state.api?.["api-free-commit"]?.executors?.values?.filter(executor => !isNull(executor)));
    const intervalRef = useRef();
    const [selectedBuild, setSelectedBuild] = useState(null);

    useEffect(() => {
        findOneBy("api-free-commit", "projects", "id", projectId, "developer");
        findAll("api-free-commit", "credentials", "developer");
        findAll("api-free-commit", "developers", "developer");
        findAll("api-free-commit", "secrets", "developer");
        findAll("api-free-commit", "executors", "developer");

        fetchBuild();

        intervalRef.current = setInterval(fetchBuild, 5000);
    }, []);

    useEffect(() => () => clearInterval(intervalRef.current), []);

    const fetchBuild = () => {
        findAllBy("api-free-commit", "builds", "project_id", projectId, "developer");
    }

    const handleKeyDown = field => e => {
        if (e.key !== "Enter") return;

        update("api-free-commit", "projects", projectId, field, {
            project: {
                [field]: e.target.value
            }
        }, "admin");
    }

    const handleCheckboxChange = field => e => {
        update("api-free-commit", "projects", projectId, field, {
            project: {
                [field]: e.target.checked
            }
        }, "admin");
    }

    const handleSelectChange = (field, value) => {
        update("api-free-commit", "projects", projectId, field, {
            project: {
                [field]: value
            }
        }, "admin");
    }

    const handleCopy = value => () => {
        clipboard(value);
        alert.success("Copied !")
    }

    const reloadSignatureKey = () => {
        managedConfirm(
            "You will reload the secret key, all webhooks will stop working with the old key",
            null,
            () => update("api-free-commit", "projects", projectId, "signature_key", null, "admin")
        );
    }

    const handleDelete = () => {
        managedConfirm(
            "You will delete this project",
            null,
            async () => {
                await remove("api-free-commit", "projects", projectId, "admin");
                onClose();
            }
        )
    }

    const getMinutes = (build) => {
        const d2 = new Date(build.completed_at);
        const d1 = new Date(build.created_at);
        const diffMs = +d2 - +d1;
        const diffMins = Math.floor((diffMs / 1000) / 60);

        return diffMins;
    }

    if (isNull(project) || isNull(developers) || isNull(credentials) || isNull(secrets) || isNull(builds)) return null;

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={4}>
                <Accordion
                    accordionConfig={
                        new AccordionConfig()
                            .setOpenByDefaultOption(true, "project-settings")
                            .addAccordionUnity(
                                new AccordionUnity()
                                    .setTitle("Project settings")
                                    .setSubTitle(project.name)
                                    .setComponent((
                                        <>
                                            <Box>
                                                <TextField
                                                    key={project.name}
                                                    label={"Name"}
                                                    variant="standard"
                                                    fullWidth
                                                    defaultValue={project.name}
                                                    onKeyDown={handleKeyDown("name")}
                                                />
                                            </Box>
                                            <Box mt={2}>
                                                <TextField
                                                    key={project.description}
                                                    label={"Description"}
                                                    variant="standard"
                                                    fullWidth
                                                    multiline
                                                    minRows={4}
                                                    maxRows={8}
                                                    defaultValue={project.description}
                                                    onKeyDown={handleKeyDown("description")}
                                                />
                                            </Box>
                                            <Box mt={2}>
                                                <TextField
                                                    key={project.keep_number_build}
                                                    label={"Number build to keep"}
                                                    variant="standard"
                                                    fullWidth
                                                    type="number"
                                                    defaultValue={project.keep_number_build}
                                                    onKeyDown={handleKeyDown("keep_number_build")}
                                                />
                                            </Box>
                                            <Box mt={2}>
                                                <Tooltip title={"All admins are allowed to launch a build"}>
                                                    <Autocomplete
                                                        key={developers.length}
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
                                                        defaultValue={developers.filter(o => project.developers_id.includes(o.id))}
                                                        onChange={(e, val) => handleSelectChange("developers_id", val?.map(v => v.id) ?? [])}
                                                    />
                                                </Tooltip>
                                            </Box>
                                            <Box mt={2}>
                                                <FormControlLabel
                                                    control={<Checkbox
                                                        defaultChecked={project.allow_concurrent_execution}
                                                        onChange={handleCheckboxChange("allow_concurrent_execution")}
                                                    />}
                                                    label="Allow concurrent execution"
                                                />
                                            </Box>
                                        </>
                                    ))
                            )
                    }
                />

            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <Accordion
                    accordionConfig={
                        new AccordionConfig()
                            .setOpenByDefaultOption(true, "build-settings")
                            .addAccordionUnity(
                                new AccordionUnity()
                                    .setTitle("Build settings")
                                    .setSubTitle(project.branch)
                                    .setComponent((
                                        <>
                                            <Box>
                                                <Autocomplete
                                                    key={credentials.length}
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
                                                    defaultValue={credentials.find(o => project.repository_credential_id === o.id)}
                                                    onChange={(e, val) => handleSelectChange("repository_credential_id", val?.id)}
                                                />
                                            </Box>
                                            <Box mt={2}>
                                                <Tooltip title={"SSH URL recommended"}>
                                                    <TextField
                                                        key={project.repository}
                                                        label={"Repository"}
                                                        variant="standard"
                                                        fullWidth
                                                        defaultValue={project.repository}
                                                        onKeyDown={handleKeyDown("repository")}
                                                    />
                                                </Tooltip>
                                            </Box>
                                            <Box mt={2}>
                                                <Tooltip
                                                    title={"The branch allows you to know if this project is affected by a webhook event, Free-Commit will automatically extract to this branch in the docker container"}>
                                                    <TextField
                                                        key={project.branch}
                                                        label={"Branch"}
                                                        variant="standard"
                                                        fullWidth
                                                        defaultValue={project.branch}
                                                        onKeyDown={handleKeyDown("branch")}
                                                    />
                                                </Tooltip>
                                            </Box>
                                            <Box mt={2}>
                                                <Tooltip
                                                    title={"From the root of your project (sample : /.free-commit/live/pipeline.yaml)"}>
                                                    <TextField
                                                        key={project.spec_file_path}
                                                        label={"Deployment file path"}
                                                        variant="standard"
                                                        fullWidth
                                                        defaultValue={project.spec_file_path}
                                                        onKeyDown={handleKeyDown("spec_file_path")}
                                                        InputProps={{
                                                            endAdornment: (
                                                                <IconButton color={"warning"} onClick={() => {
                                                                    window.open("https://romain.gitbook.io/free-commit/build/spec-file", "_blank")
                                                                }}>
                                                                    <Help/>
                                                                </IconButton>
                                                            )
                                                        }}
                                                    />
                                                </Tooltip>
                                            </Box>
                                            <Box mt={2}>
                                                <Autocomplete
                                                    key={secrets.length}
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
                                                    defaultValue={secrets.filter(o => project.secrets_id.includes(o.id))}
                                                    onChange={(e, val) => handleSelectChange("secrets_id", val?.map(v => v.id) ?? [])}
                                                />
                                            </Box>
                                            <Box mt={2}>
                                                <FormControl fullWidth variant="standard">
                                                    <InputLabel id="driver">Executor</InputLabel>
                                                    <Select
                                                        labelId="driver"
                                                        label="Role"
                                                        defaultValue={!isNull(project.executor_id) ? project.executor_id : executors.find(e => e.driver === "localDriver").id}
                                                        onChange={e => handleSelectChange("executor_id", e.target.value)}
                                                    >
                                                        {
                                                            executors.map(e => (
                                                                <MenuItem key={e.id} value={e.id}>{e.name}</MenuItem>
                                                            ))
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </>
                                    ))
                            )
                    }
                />

                <Box mt={2}>
                    <Accordion
                        accordionConfig={
                            new AccordionConfig()
                                .setOpenByDefaultOption(true, "webhook-settings")
                                .addAccordionUnity(
                                    new AccordionUnity()
                                        .setTitle("Webhook settings")
                                        .setComponent((
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell variant="head">
                                                            Webhook URL
                                                        </TableCell>
                                                        <TableCell sx={{fontSize: "small"}}>
                                                            https://{window.location.host}/api-free-commit/guest/webhooks/build/{projectId}
                                                        </TableCell>
                                                        <TableCell>
                                                            <IconButton
                                                                onClick={handleCopy(`https://${window.location.host}/api-free-commit/guest/webhooks/build/${projectId}`)}>
                                                                <CopyAll/>
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell variant="head">
                                                            Secret key
                                                        </TableCell>
                                                        <TableCell sx={{fontSize: "small"}}>
                                                            {project.signature_key}
                                                        </TableCell>
                                                        <TableCell>
                                                            <Box display="flex">
                                                                <IconButton
                                                                    onClick={handleCopy(project.signature_key)}>
                                                                    <CopyAll/>
                                                                </IconButton>
                                                                <IconButton
                                                                    onClick={reloadSignatureKey}>
                                                                    <Cached/>
                                                                </IconButton>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell variant="head" sx={{color: orange[500]}}>
                                                            Accept
                                                        </TableCell>
                                                        <TableCell sx={{fontSize: "small"}}>
                                                            application/json
                                                        </TableCell>
                                                        <TableCell>

                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        ))
                                )
                        }
                    />
                </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
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
                    <LaunchBuild projectId={projectId}/>
                    <Button startIcon={<ArrowBack/>} variant="contained" size={"small"} onClick={onClose}>
                        Back
                    </Button>
                </Box>
                <Box mt={3}>
                    <Alert severity={"info"}>
                        <Link
                            href={"https://romain.gitbook.io/free-commit/build"}
                            target={"_blank"}
                        >
                            Read more about the builds
                        </Link>
                    </Alert>
                </Box>
                <Box mt={2}>
                    <Accordion
                        accordionConfig={
                            new AccordionConfig()
                                .setOpenByDefaultOption(true, "old-build")
                                .addAccordionUnity(
                                    new AccordionUnity()
                                        .setTitle("Old build")
                                        .setComponent((
                                            <Table>
                                                <TableHead>
                                                    <TableRow>
                                                        <TableCell>
                                                            ID
                                                        </TableCell>
                                                        <TableCell>
                                                            Status
                                                        </TableCell>
                                                        <TableCell>
                                                            Date
                                                        </TableCell>
                                                        <TableCell>
                                                            Duration
                                                        </TableCell>
                                                    </TableRow>
                                                </TableHead>
                                                <TableBody key={builds.length}>
                                                    {
                                                        builds.length === 0
                                                            ? (
                                                                <TableRow>
                                                                    <TableCell colSpan={4} sx={{textAlign: "center"}}>
                                                                        No build available
                                                                    </TableCell>
                                                                </TableRow>
                                                            )
                                                            : builds.map(build => (
                                                                <TableRow key={build.id}>
                                                                    <TableCell variant="head">
                                                                        <Link href="#"
                                                                              onClick={() => setSelectedBuild(build.id)}>
                                                                            {build.id}
                                                                        </Link>
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        <Chip
                                                                            label={`${build.exit_code} (${build.exit_message !== null ? build.exit_message : 'No message available'})`}
                                                                            color={build.exit_code === 0 ? "success" : "error"}
                                                                            size="small"
                                                                        />
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {helper.formatDate(build.created_at)}
                                                                    </TableCell>
                                                                    <TableCell>
                                                                        {getMinutes(build)} mn
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))
                                                    }

                                                </TableBody>
                                            </Table>
                                        ))
                                )
                        }
                    />
                </Box>
            </Grid>

            {confirmModal}

            {
                !isNull(selectedBuild)
                    ? (
                        <Modal
                            modalConfig={
                                new ModalConfig()
                                    .setHeight("90%")
                                    .setWidth("70%")
                                    .setOnClose(() => setSelectedBuild(null))
                                    .setComponent(<LogReader executorId={selectedBuild.toString()}/>)
                            }
                        />
                    )
                    : null
            }
        </Grid>
    );
}