import React from "react";
import GetOne from "../../component/project/GetOne";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function GetProject() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetOne/>
        </div>
    );
}
