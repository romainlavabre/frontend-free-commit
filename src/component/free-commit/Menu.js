import Box from "@mui/material/Box";
import {AppBar, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Toolbar} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AccountCircle, Construction, GitHub, Key, Logout, Menu as MenuIcon, Settings} from "@mui/icons-material";
import {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router";
import useAxiosConfig from "../../use/useAxiosConfig";
import database from "../../package-react-wrapper/database/database";
import QueuedBuild from "./build/QueuedBuild";
import ExecutedBuild from "./build/ExecutedBuild";

function getItems() {
    return [
        {
            name: "Projects",
            path: "/free-commit/project",
            icon: <Construction fontSize={"small"}/>
        },
        {
            name: "Secrets",
            path: "/free-commit/secret",
            icon: <Key fontSize={"small"}/>
        },
        {
            name: "Source code credentials",
            path: "/free-commit/credential",
            icon: <GitHub fontSize={"small"}/>
        },
        {
            name: "Users",
            path: "/free-commit/developer",
            icon: <AccountCircle fontSize={"small"}/>
        },
        {
            name: "Config",
            path: "/free-commit/config",
            icon: <Settings fontSize={"small"}/>
        }
    ]
}

export default function () {
    useAxiosConfig();
    const navigate = useNavigate();
    const location = useLocation();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenu = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleClick = item => () => {
        navigate(item.path);
        handleClose();
    }

    const handleLogout = () => {
        database.write("authentication", "access_token", null);
        navigate("/");
    }


    return (
        <>
            <Box sx={{flexGrow: 1}}>
                <AppBar position="static">
                    <Toolbar variant="dense">
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                            sx={{mr: 2}}
                        >
                            <MenuIcon/>
                        </IconButton>
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
                                getItems().map(item => (
                                    <MenuItem
                                        key={item.name}
                                        onClick={handleClick(item)}
                                        disabled={location.pathname.endsWith(item.path)}
                                    >
                                        <ListItemIcon>
                                            {item.icon}
                                        </ListItemIcon>
                                        <ListItemText>{item.name}</ListItemText>
                                    </MenuItem>
                                ))
                            }
                            <MenuItem onClick={handleLogout}>
                                <ListItemIcon>
                                    <Logout fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText>Logout</ListItemText>
                            </MenuItem>
                        </Menu>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            {getItems().find(item => location.pathname.endsWith(item.path))?.name}
                        </Typography>
                        <Box sx={{flexGrow: 1}}/>
                        <QueuedBuild/>
                        <ExecutedBuild/>
                    </Toolbar>
                </AppBar>
            </Box>
            <Box p={2}>
                <Outlet/>
            </Box>
        </>
    );
}