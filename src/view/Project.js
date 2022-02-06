import Menu from "../component/Menu";
import React from "react";
import List from "../component/project/List";

export default function Project() {
    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <Menu activeName={'project'}/>
                </div>
                <div className="w-full m-3">
                    <List/>
                </div>
            </div>
        </>
    )
}
