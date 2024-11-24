import useAlert from "../../../package-react-wrapper/use/useAlert";
import {useEffect, useRef, useState} from "react";
import api from "../../../api/api";
import {Badge, IconButton, ListItemIcon, Menu, MenuItem, Tooltip} from "@mui/material";
import {Delete, PendingActions} from "@mui/icons-material";

export default function () {
    const alert = useAlert();
    const [anchorEl, setAnchorEl] = useState(null);
    const [queued, setQueued] = useState([]);
    const intervalRef = useRef();

    useEffect(() => {
        fetchExecuted();

        intervalRef.current = setInterval(() => {
            fetchExecuted();
        }, 3000);
    }, []);

    useEffect(() => () => clearInterval(intervalRef.current), []);

    useEffect(() => {
        if (queued.length === 0) handleClose();
    }, [queued.length]);

    const handleMenu = (event) => {
        if (queued.length === 0) return;

        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => setAnchorEl(null);

    const fetchExecuted = async () => {
        setQueued((await api.build.getQueueds()));
    }

    const kill = executorId => async () => {
        const isSuccess = await api.build.killQueued(executorId);

        if (isSuccess) {
            alert.launch("Executor killed successfully");
            return;
        }

        alert.launch("Unable to kill executor", "error");
    }

    return (
        <>
            <Tooltip title={"Queued build"}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                    sx={{mr: 2}}
                >
                    <Badge badgeContent={queued.length} color={"primary"}>
                        <PendingActions/>
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
                    queued.map(item => (
                        <Tooltip key={item.executor_id} title={`Kill the waiting task ${item.executor_id}`}
                                 placement="left">
                            <MenuItem onClick={kill(item.executor_id)}>
                                <ListItemIcon>
                                    <Delete fontSize="small"/>
                                </ListItemIcon>
                                {item.project_name}
                            </MenuItem>
                        </Tooltip>
                    ))
                }
            </Menu>
        </>
    )
}