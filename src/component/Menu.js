import React from "react";
import {Outlet, useLocation, useNavigate} from "react-router";
import logo from "../assets/img/logo/logo_transparent.png";
import PowerIcon from "./util/icon/PowerIcon";
import CogIcon from "./util/icon/CogIcon";
import KeyIcon from "./util/icon/KeyIcon";
import UserGroupIcon from "./util/icon/UserGroupIcon";

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();

    const items = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                </svg>
            ),
            name: "Projects",
            active: location.pathname.startsWith('/project'),
            route: '/project'
        },
        {
            icon: <UserGroupIcon size={5}/>,
            name: "Users",
            active: location.pathname.startsWith('/developer'),
            route: '/developer'
        },
        {
            icon: <KeyIcon size={5}/>,
            name: "Secrets",
            active: location.pathname.startsWith('/secret'),
            route: '/secret'
        },
        {
            icon: <KeyIcon size={5}/>,
            name: "Credentials",
            active: location.pathname.startsWith('/credential'),
            route: '/credential'
        },
        {
            icon: <CogIcon size={5}/>,
            name: "Config",
            active: location.pathname.startsWith('/config'),
            route: '/config'
        },
        {
            icon: <PowerIcon size={5}/>,
            name: "Logout",
            active: false,
            route: '/'
        }
    ];

    const onClick = route => {
        navigate(route);
    }

    return (
        <div className="flex h-screen">
            <div className=" text-lg bg-gray h-screen">
                <ul>
                    <li className="flex px-6 py-5 bg-light justify-center">
                        <img src={logo} className="w-32"/>
                    </li>
                    {
                        items.map((item, index) => (
                            <li key={index}
                                className={`cursor-pointer flex px-2 py-2 w-full hover:bg-gray-700 ${item.active ? 'bg-gray-700' : ''}`}
                                onClick={() => onClick(item.route)}>
                                <div className="mx-3 my-auto">
                                    {item.icon}
                                </div>
                                {item.name}
                            </li>
                        ))
                    }
                </ul>
            </div>
            <div className="w-full p-3">
                <Outlet/>
            </div>
        </div>
    );
}
