import Menu from "../component/Menu";
import React from "react";
import useInitStore from "../store/useInitStore";
import CheckEmail from "./config/CheckEmail";
import useAxiosConfig from "../use/useAxiosConfig";

export default function Config() {
    useAxiosConfig();
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
