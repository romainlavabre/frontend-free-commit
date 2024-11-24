import {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import {Badge, CircularProgress, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Tooltip} from "@mui/material";
import {OpenInFull, Pause} from "@mui/icons-material";
import ExecutedTime from "./ExecutedTime";
import Typography from "@mui/material/Typography";
import isNull from "../../../package-react-wrapper/mixin/isNull";
import Modal from "../../../package-react-wrapper/material/modal/Modal";
import ModalConfig from "../../../package-react-wrapper/material/modal/ModalConfig";
import LogReader from "./LogReader";

export default function () {
    const [anchorEl, setAnchorEl] = useState(null);
    const [executed, setExecuted] = useState([]);
    const intervalRef = useRef();
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        fetchExecuted();

        intervalRef.current = setInterval(() => {
            fetchExecuted();
        }, 3000);
    }, []);

    useEffect(() => () => clearInterval(intervalRef.current), []);

    useEffect(() => {
        if (executed.length === 0) handleClose();
    }, [executed.length]);

    const handleMenu = (event) => {
        if (executed.length === 0) return;

        setAnchorEl(event.currentTarget);
    }
    const handleClose = () => setAnchorEl(null);

    const fetchExecuted = async () => {
        setExecuted((await api.build.getExecuteds()));
    }

    const handleTaskClicked = id => () => {
        setSelected(id);
        handleClose();
    }

    return (
        <>
            <Tooltip title={executed.length === 0 ? "The slaves are sleeping" : "Slaves work"}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{mr: 2}}
                >
                    <Badge badgeContent={executed.length} color={"error"}>
                        {
                            executed.length > 0
                                ? <CircularProgress size={20}/>
                                : <Pause/>
                        }

                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                {
                    executed.map(item => (
                        <Tooltip key={item.executor_id} title={`Kill the task ${item.executor_id}`}
                                 placement="left">
                            <MenuItem onClick={handleTaskClicked(item.executor_id)}>
                                <ListItemIcon>
                                    <OpenInFull fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>
                                    {item.project_name}&nbsp;
                                </ListItemText>
                                <Typography variant="body2" sx={{color: 'text.secondary'}}>
                                    <ExecutedTime at={item.at}/>
                                </Typography>
                            </MenuItem>
                        </Tooltip>
                    ))
                }
            </Menu>

            {
                !isNull(selected)
                    ? (
                        <Modal
                            modalConfig={
                                new ModalConfig()
                                    .setHeight("90%")
                                    .setWidth("70%")
                                    .setOnClose(() => setSelected(null))
                                    .setComponent(<LogReader executorId={selected}/>)
                            }
                        />
                    )
                    : null
            }
        </>
    )
}