import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Login from "../view/Login";
import Project from "../view/Project";
import User from "../view/User";
import CreateUser from "../view/user/CreateUser";
import GetUser from "../view/user/GetUser";
import UpdateUser from "../view/user/UpdateUser";
import Secret from "../view/Secret";
import CreateSecret from "../view/secret/CreateSecret";
import UpdateSecret from "../view/secret/UpdateSecret";
import GetSecret from "../view/secret/GetSecret";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route exact path="/project" element={<Project/>}/>
                <Route exact path="/user" element={<User/>}/>
                <Route exact path="/user/:id" element={<GetUser/>}/>
                <Route exact path="/user/create" element={<CreateUser/>}/>
                <Route exact path="/user/update/:id" element={<UpdateUser/>}/>
                <Route exact path="/secret" element={<Secret/>}/>
                <Route exact path="/secret/:id" element={<GetSecret/>}/>
                <Route exact path="/secret/create" element={<CreateSecret/>}/>
                <Route exact path="/secret/update/:id" element={<UpdateSecret/>}/>
            </Routes>
        </BrowserRouter>
    );
}
