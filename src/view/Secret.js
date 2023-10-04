import Menu from "../component/Menu";
import React from "react";
import {useNavigate} from "react-router";
import GetAll from "../component/secret/GetAll";
import useInitStore from "../store/useInitStore";
import useAxiosConfig from "../use/useAxiosConfig";

export default function Secret() {
    const navigate = useNavigate();
    useAxiosConfig();
    useInitStore();

    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <Menu/>
                </div>
                <div className="w-full m-3">
                    <div className="flex justify-end">
                        <button className="flex bg-ovh rounded py-2 px-10" onClick={() => navigate('/secret/create')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M18 8a6 6 0 01-7.743 5.743L10 14l-1 1-1 1H6v2H2v-4l4.257-4.257A6 6 0 1118 8zm-6-4a1 1 0 100 2 2 2 0 012 2 1 1 0 102 0 4 4 0 00-4-4z"
                                      clipRule="evenodd"/>
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    <GetAll/>
                </div>

            </div>
        </>
    );
}
