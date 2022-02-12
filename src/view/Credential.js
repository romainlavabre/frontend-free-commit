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
                    <div className="flex justify-end">
                        <button className="flex bg-ovh rounded py-2 px-10 text-dark text-2xl"
                                onClick={() => navigate('/credential/create')}>
                            <img src={github} className="mx-3"/>
                            Github
                        </button>
                    </div>
                    <GetAll/>
                </div>

            </div>
        </>
    );
}
