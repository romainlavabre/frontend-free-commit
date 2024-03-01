import React from "react";
import GetAll from "../../component/free-commit/credential/GetAll";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function Credential() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetAll/>
        </div>
    );
}
