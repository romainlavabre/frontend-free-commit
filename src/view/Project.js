import Menu from "../component/Menu";
import React from "react";
import GetAll from "../component/project/GetAll";

export default function Project() {
    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <Menu/>
                </div>
                <div className="w-full m-3">
                    <GetAll/>
                </div>
            </div>
        </>
    )
}
