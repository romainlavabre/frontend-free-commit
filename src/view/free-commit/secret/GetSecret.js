import React from "react";
import useAxiosConfig from "../../../use/useAxiosConfig";
import GetOne from "../../../component/free-commit/secret/GetOne";

export default function GetSecret() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetOne/>
        </div>
    );
}
