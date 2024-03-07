import React from "react";
import useAxiosConfig from "../../../use/useAxiosConfig";
import GetOne from "../../../component/free-ping/ticket/GetOne";

export default function () {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetOne/>
        </div>
    );
}
