import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Login from "../view/Login";
import Project from "../view/Project";
import User from "../view/User";
import CreateUser from "../view/user/CreateUser";
import UpdateUser from "../view/user/UpdateUser";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/project" element={<Project/>}/>
                <Route exact path="/user" element={<User/>}/>
                <Route exact path="/user/create" element={<CreateUser/>}/>
                <Route exact path="/user/update/:id" element={<UpdateUser/>}/>
            </Routes>
        </BrowserRouter>
    );
}
