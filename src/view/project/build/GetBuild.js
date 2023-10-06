import React from "react";
import SeeLog from "../../../component/project/build/SeeLog";
import useAxiosConfig from "../../../use/useAxiosConfig";

export default function GetBuild() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <SeeLog/>
        </div>
    )
}
