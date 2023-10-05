import React from "react";
import GetAll from "../component/credential/GetAll";
import useAxiosConfig from "../use/useAxiosConfig";

export default function Credential() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetAll/>
        </div>
    );
}
