import React from "react";
import GetOne from "../../component/secret/GetOne";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function GetSecret() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetOne/>
        </div>
    );
}
