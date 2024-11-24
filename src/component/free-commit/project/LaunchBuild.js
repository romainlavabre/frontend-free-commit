import {Construction, RadioButtonChecked, RadioButtonUnchecked} from "@mui/icons-material";
import {Alert, Button, Divider, Drawer, Link, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import List from "@mui/material/List";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import useApi from "../../../api/auto/useApi";
import ListItem from "@mui/material/ListItem";
import Box from "@mui/material/Box";
import api from "../../../api/api";

export default function ({projectId}) {
    const {findOneBy} = useApi();
    const project = useSelector(state => state.api?.["api-free-commit"]?.projects?.values[projectId]);
    const [open, setOpen] = useState(false);
    const [disabledSteps, setDisabledSteps] = useState([]);

    useEffect(() => {
        if (open && isNull(project)) {
            findOneBy("api-free-commit", "projects", "id", projectId, "developer");
        }
    }, [open]);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const handleClick = step => () => {
        let result = [...disabledSteps];

        if (result.includes(step)) {
            result = result.filter(r => r !== step);
        } else {
            result.push(step);
        }

        setDisabledSteps(result);
    }

    const handleLaunch = async () => {
        await api.build.launch(projectId, disabledSteps);
        handleClose();
    }

    const handleClose = () => {
        setDisabledSteps([]);
        toggleDrawer(false)();
    }

    return (
        <>
            <Button
                startIcon={<Construction/>}
                variant="contained"
                size={"small"}
                onClick={e => {
                    e.stopPropagation();
                    toggleDrawer(true)();
                }}
            >
                Build
            </Button>

            <Drawer open={open && !isNull(project)} onClose={toggleDrawer(false)} anchor={"right"}>
                <Box sx={{width: 400}} role="presentation">
                    <Box m={2}>
                        <Alert severity={"info"}>
                            <Link
                                href={"https://romain.gitbook.io/free-commit/build/manual-launch"}
                                target={"_blank"}
                            >
                                Read more about the manual launch
                            </Link>
                        </Alert>
                    </Box>
                    <List>
                        {!isNull(project) && project.available_steps.map((text, index) => (
                            <ListItem key={text} disablePadding>
                                <ListItemButton onClick={handleClick(text)}>
                                    <ListItemIcon>
                                        {
                                            disabledSteps.includes(text)
                                                ? <RadioButtonUnchecked/>
                                                : <RadioButtonChecked/>
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text}/>
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                    <Divider/>
                    <Box px={2} mt={5}>
                        <Box>
                            <Button
                                startIcon={<Construction/>}
                                variant="contained"
                                size="small"
                                fullWidth
                                onClick={handleLaunch}
                            >
                                Launch
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Drawer>
        </>
    )
}