import useAxiosConfig from "../../../use/useAxiosConfig";
import React from "react";
import Public from "../../../component/free-ping/ticket/Public";

export default function () {
    useAxiosConfig();

    return (
        <div className="w-full">
            <Public/>
        </div>
    );
}