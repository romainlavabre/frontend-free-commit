import Menu from "../../component/Menu";
import React from "react";
import {useNavigate} from "react-router";
import Create from "../../component/developer/Create";
import useInitStore from "../../store/useInitStore";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function CreateUser() {
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
                        <button className="bg-gray-500 rounded py-2 px-10" onClick={() => navigate('/developer')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M6.707 4.879A3 3 0 018.828 4H15a3 3 0 013 3v6a3 3 0 01-3 3H8.828a3 3 0 01-2.12-.879l-4.415-4.414a1 1 0 010-1.414l4.414-4.414zm4 2.414a1 1 0 00-1.414 1.414L10.586 10l-1.293 1.293a1 1 0 101.414 1.414L12 11.414l1.293 1.293a1 1 0 001.414-1.414L13.414 10l1.293-1.293a1 1 0 00-1.414-1.414L12 8.586l-1.293-1.293z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    <Create/>
                </div>
            </div>
        </>
    );
}