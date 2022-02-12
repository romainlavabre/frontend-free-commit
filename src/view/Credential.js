import Menu from "../component/Menu";
import React from "react";
import {useNavigate} from "react-router";
import GetAll from "../component/credential/GetAll";
import github from "../assets/img/github.png";

export default function Credential() {
    const navigate = useNavigate();

    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <Menu/>
                </div>
                <div className="w-full m-3">
                    <div className="flex justify-between mb-5">
                        <button className="flex bg-gray-500 rounded py-2 px-10 text-dark text-2xl mx-5"
                                disabled={true}
                                onClick={() => navigate('/credential/create')}>
                            <img src={github} className="mx-3"/>
                            Github
                        </button>
                        <button className="flex bg-ovh rounded py-2 px-10 text-dark"
                                onClick={() => navigate('/credential/create')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
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
