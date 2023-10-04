import React from "react";
import GetAll from "../component/developer/GetAll";
import useAxiosConfig from "../use/useAxiosConfig";

export default function Developer() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetAll/>
        </div>
    );
}
