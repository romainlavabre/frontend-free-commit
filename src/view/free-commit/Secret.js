import React from "react";
import GetAll from "../../component/free-commit/secret/GetAll";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function Secret() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetAll/>
        </div>
    );
}
