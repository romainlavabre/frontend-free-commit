import React from "react";
import SeeLog from "../../../component/project/build/SeeLog";
import GetOne from "../../../component/project/build/GetOne";
import useAxiosConfig from "../../../use/useAxiosConfig";

export default function GetBuild() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <SeeLog/>
            <GetOne/>
        </div>
    )
}
