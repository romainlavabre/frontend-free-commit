import React from "react";
import useAxiosConfig from "../../../use/useAxiosConfig";
import Update from "../../../component/free-commit/secret/Update";

export default function UpdateSecret() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <Update/>
        </div>
    );
}
