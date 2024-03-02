import React, {useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router";
import logo from "../assets/img/logo/logo-light-2.png";
import PowerIcon from "./util/icon/PowerIcon";
import CogIcon from "./util/icon/CogIcon";
import KeyIcon from "./util/icon/KeyIcon";
import UserGroupIcon from "./util/icon/UserGroupIcon";
import CommandLineIcon from "./util/icon/CommandLineIcon";
import isNull from "../mixin/global/isNull";
import ArrowBottomIcon from "./util/icon/ArrowBottomIcon";
import ServerStackIcon from "./util/icon/ServerStackIcon";
import ArrowTopIcon from "./util/icon/ArrowTopIcon";
import ExclamationTriangleIcon from "./util/icon/ExclamationTriangleIcon";

export default function Menu() {
    const navigate = useNavigate();
    const location = useLocation();
    const [active, setActive] = useState(null);

    const items = [
        {
            icon: <CommandLineIcon size={5}/>,
            name: "Free Commit",
            active: location.pathname.startsWith('/free-commit'),
            sub: [
                {
                    icon: (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20"
                             fill="currentColor">
                            <path
                                d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z"/>
                        </svg>
                    ),
                    name: "Projects",
                    active: location.pathname.startsWith('/free-commit/project'),
                    route: '/free-commit/project'
                },
                {
                    icon: <KeyIcon size={5}/>,
                    name: "Secrets",
                    active: location.pathname.startsWith('/free-commit/secret'),
                    route: '/free-commit/secret'
                },
                {
                    icon: <KeyIcon size={5}/>,
                    name: "Credentials",
                    active: location.pathname.startsWith('/free-commit/credential'),
                    route: '/free-commit/credential'
                },
                {
                    icon: <CogIcon size={5}/>,
                    name: "Config",
                    active: location.pathname.startsWith('/free-commit/config'),
                    route: '/free-commit/config'
                }
            ]
        },
        {
            icon: <ServerStackIcon size={5}/>,
            name: "Free Ping",
            active: location.pathname.startsWith('/free-ping'),
            sub: [
                {
                    icon: <ServerStackIcon size={5}/>,
                    name: "Ping",
                    active: location.pathname.startsWith('/free-ping/ping'),
                    route: "/free-ping/ping"
                },
                {
                    icon: <ExclamationTriangleIcon size={5}/>,
                    name: "Outage",
                    active: location.pathname.startsWith('/free-ping/outage'),
                    route: "/free-ping/outage"
                },
                {
                    icon: <CogIcon size={5}/>,
                    name: "Config",
                    active: location.pathname.startsWith('/free-ping/config'),
                    route: "/free-ping/config"
                }
            ]
        },
        {
            icon: <UserGroupIcon size={5}/>,
            name: "Users",
            active: location.pathname.startsWith('/developer'),
            route: '/free-commit/developer'
        },
        {
            icon: <PowerIcon size={5}/>,
            name: "Logout",
            active: false,
            route: '/'
        }
    ];

    const onClick = item => {
        if (!isNull(item.sub)) {
            setActive(active !== item.name ? item.name : null)
            return;
        }
        navigate(item.route);
    }

    return (
        <div className="flex h-screen">
            <div className="text-lg bg-gray h-full w-2/12">
                <ul>
                    <li className="flex px-6 py-5 bg-light justify-center">
                        <img src={logo} className="w-32"/>
                    </li>
                    {
                        items.map((item, index) => (
                            <span key={index}>
                                <li key={index}
                                    className={`relative cursor-pointer flex px-2 py-2 w-full hover:bg-gray-700 ${item.active ? 'bg-gray-700' : ''}`}
                                    onClick={() => onClick(item)}>
                                    <div className="mx-3 my-auto">
                                        {item.icon}
                                    </div>
                                    <div>
                                        {item.name}
                                    </div>
                                    {
                                        !isNull(item.sub)
                                            ? (
                                                <>
                                                    {
                                                        item.name === active || item.active
                                                            ? (
                                                                <div className="absolute right-5">
                                                                    <ArrowBottomIcon size={6}/>
                                                                </div>
                                                            )
                                                            : (
                                                                <div className="absolute right-5">
                                                                    <ArrowTopIcon size={6}/>
                                                                </div>
                                                            )
                                                    }
                                                </>

                                            )
                                            : null
                                    }
                                </li>
                                {
                                    !isNull(item.sub) && (item.name === active || item.active)
                                        ? (
                                            <ul>
                                                {
                                                    item.sub.map((subitem, index) => (
                                                        <li key={index}
                                                            className={`relative cursor-pointer flex pl-5 py-2 w-full hover:bg-gray-800 ${subitem.active ? 'bg-gray-800' : ''}`}
                                                            onClick={() => onClick(subitem)}>
                                                            <div className="w-full">
                                                                <div className="flex">
                                                                    <div className="ml-5 mr-3 my-auto">
                                                                        {subitem.icon}
                                                                    </div>
                                                                    <div>
                                                                        {subitem.name}
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </li>
                                                    ))
                                                }
                                            </ul>
                                        )
                                        : null

                                }
                            </span>
                        ))
                    }
                </ul>
            </div>
            <div className="w-full p-3 overflow-y-auto">
                <Outlet/>
            </div>
        </div>
    );
}
