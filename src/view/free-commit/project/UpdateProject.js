import React from "react";
import Update from "../../../component/free-commit/project/Update";
import useAxiosConfig from "../../../use/useAxiosConfig";

export default function UpdateProject() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <Update/>
        </div>
    );
}
