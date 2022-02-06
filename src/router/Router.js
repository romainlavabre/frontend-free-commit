import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Login from "../view/Login";
import Project from "../view/Project";
import User from "../view/User";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login/>}/>
                <Route path="/project" element={<Project/>}/>
                <Route path="/user" element={<User/>}/>
            </Routes>
        </BrowserRouter>
    );
}
