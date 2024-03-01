import React from "react";
import GetOne from "../../../component/free-commit/developer/GetOne";
import useAxiosConfig from "../../../use/useAxiosConfig";

export default function GetDeveloper() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetOne/>
        </div>
    );
}
