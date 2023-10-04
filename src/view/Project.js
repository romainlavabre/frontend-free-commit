import React from "react";
import GetAll from "../component/project/GetAll";
import useInitStore from "../store/useInitStore";
import ExecutedBuild from "../component/project/build/ExecutedBuild";
import QueuedBuild from "../component/project/build/QueuedBuild";
import useAxiosConfig from "../use/useAxiosConfig";

export default function Project() {
    useAxiosConfig();
    useInitStore();

    return (
        <>
            <div className="w-full">
                <GetAll/>
            </div>
            <hr/>
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
