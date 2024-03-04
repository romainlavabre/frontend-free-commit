import React from "react";
import useAxiosConfig from "../../use/useAxiosConfig";
import GetAll from "../../component/free-ping/page/GetAll";

export default function () {
    useAxiosConfig();

    return (
        <div className="w-full">
            <GetAll/>
        </div>
    );
}
