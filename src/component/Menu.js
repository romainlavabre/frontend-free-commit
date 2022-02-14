import React from "react";
import {useLocation, useNavigate} from "react-router";

export default function Menu() {
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
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                </svg>
            ),
            name: "Users",
            active: location.pathname.startsWith('/user'),
            route: '/user'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                          clipRule="evenodd"/>
                </svg>
            ),
            name: "Secrets",
            active: location.pathname.startsWith('/secret'),
            route: '/secret'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd"
                          d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                          clipRule="evenodd"/>
                </svg>
            ),
            name: "Credentials",
            active: location.pathname.startsWith('/credential'),
            route: '/credential'
        }
    ];

    const navigate = useNavigate();

    const onClick = (route) => {
        navigate(route);
    }

    return (
        <>
            <div className="flex text-lg">
                <ul className="text-gray-900 text-white">
                    <li className="flex px-6 py-5 bg-light">

                    </li>
                    {
                        items.map((item, index) => (
                            <li key={index}
                                className={`cursor-pointer flex px-6 py-2 border-gray-200 w-full hover:bg-ovh ${item.active ? 'bg-fairfair' : 'bg-light'}`}
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
        </>
    );
}
