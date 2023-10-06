import React from "react";
import CheckEmail from "../component/config/CheckEmail";
import useAxiosConfig from "../use/useAxiosConfig";
import Env from "../component/config/Env";

export default function Config() {
    useAxiosConfig();

    return (
        <div className="w-full">
            <CheckEmail/>

            <hr className="w-8/12 mx-auto my-5"/>
            <div className="mt-10">
                <Env/>
            </div>
        </div>
    )
}
