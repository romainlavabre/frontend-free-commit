import React from "react";
import CheckEmail from "../../component/free-ping/config/CheckEmail";
import useAxiosConfig from "../../use/useAxiosConfig";
import Env from "../../component/free-ping/config/Env";
import CheckSms from "../../component/free-ping/config/CheckSms";

export default function () {
    useAxiosConfig();

    return (
        <div className="w-full">
            <CheckEmail/>
            <CheckSms/>

            <hr className="w-8/12 mx-auto my-5"/>
            <div className="mt-10">
                <Env/>
            </div>
        </div>
    )
}
