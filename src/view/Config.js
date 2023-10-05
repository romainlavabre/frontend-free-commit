import React from "react";
import CheckEmail from "./config/CheckEmail";
import useAxiosConfig from "../use/useAxiosConfig";

export default function Config() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <CheckEmail/>
        </div>
    )
}
