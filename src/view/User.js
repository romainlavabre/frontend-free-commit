import Menu from "../component/Menu";
import React from "react";
import List from "../component/user/List";

export default function User() {
    return (
        <>
            <div className="flex flex-row">
                <div className="">
                    <Menu activeName={'user'}/>
                </div>
                <div className="w-full m-3">
                    <List/>
                </div>
            </div>
        </>
    )
}
