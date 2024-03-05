import Status from "../../../component/free-ping/page/status/Status";
import React from "react";
import useAxiosConfig from "../../../use/useAxiosConfig";

export default function () {
    useAxiosConfig();
    
    return (
        <div className="w-full">
            <Status/>
        </div>
    );
}