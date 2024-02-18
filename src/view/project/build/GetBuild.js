import React from "react";
import useAxiosConfig from "../../../use/useAxiosConfig";
import SeeLogV2 from "../../../component/project/build/SeeLogV2";

export default function GetBuild() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <SeeLogV2/>
        </div>
    )
}
