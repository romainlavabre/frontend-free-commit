import React from "react";
import Create from "../../component/developer/Create";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function CreateDeveloper() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <Create/>
        </div>
    );
}
