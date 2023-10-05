import React from "react";
import Update from "../../component/credential/Update";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function UpdateCredential() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <Update/>
        </div>
    );
}
