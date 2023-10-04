import React from "react";
import Update from "../../component/secret/Update";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function UpdateSecret() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <Update/>
        </div>
    );
}
