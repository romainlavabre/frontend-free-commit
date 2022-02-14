import Menu from "../component/Menu";
import React from "react";
import GetAll from "../component/project/GetAll";
import {useNavigate} from "react-router";
import useInitStore from "../store/useInitStore";

export default function Project() {
    const navigate = useNavigate();

    useInitStore();

    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <Menu/>
                </div>
                <div className="w-full m-3">
                    <div className="flex justify-end">
                        <button className="bg-ovh rounded py-2 px-10" onClick={() => navigate('/project/create')}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"/>
                                <path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 11h4m-2-2v4"/>
                            </svg>
                        </button>
                    </div>
                    <GetAll/>
                </div>
            </div>
        </>
    )
}
