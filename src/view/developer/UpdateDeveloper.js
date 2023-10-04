import React from "react";
import Update from "../../component/developer/Update";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function UpdateDeveloper() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <Update/>
        </div>
    );
}
