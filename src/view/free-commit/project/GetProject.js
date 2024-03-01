import React from "react";
import useAxiosConfig from "../../../use/useAxiosConfig";
import GetOne from "../../../component/free-commit/project/GetOne";

export default function GetProject() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetOne/>
        </div>
    );
}
