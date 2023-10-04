import React from "react";
import GetAll from "../component/project/GetAll";
import ExecutedBuild from "../component/project/build/ExecutedBuild";
import QueuedBuild from "../component/project/build/QueuedBuild";
import useAxiosConfig from "../use/useAxiosConfig";

export default function Project() {
    useAxiosConfig();

    return (
        <>
            <div className="w-full">
                <GetAll/>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div className="flex">
                <div className="w-full mr-1">
                    <QueuedBuild projectScope={null}/>
                </div>
                <div className="w-full ml-1">
                    <ExecutedBuild projectScope={null}/>
                </div>
            </div>
        </>
    )
}
