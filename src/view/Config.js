import Menu from "../component/Menu";
import React from "react";
import {useNavigate} from "react-router";
import useInitStore from "../store/useInitStore";
import CheckEmail from "./config/CheckEmail";

export default function Config() {
    const navigate = useNavigate();

    useInitStore();
    return (
        <>
            <div className="flex flex-row">
                <div>
                    <Menu/>
                </div>
                <div className="w-full m-3">
                    <CheckEmail/>
                </div>
            </div>
        </>
    )
}
