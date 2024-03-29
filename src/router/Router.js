import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Login from "../view/Login";
import Project from "../view/Project";
import Developer from "../view/Developer";
import CreateDeveloper from "../view/developer/CreateDeveloper";
import GetDeveloper from "../view/developer/GetDeveloper";
import UpdateDeveloper from "../view/developer/UpdateDeveloper";
import Secret from "../view/Secret";
import CreateSecret from "../view/secret/CreateSecret";
import UpdateSecret from "../view/secret/UpdateSecret";
import GetSecret from "../view/secret/GetSecret";
import Credential from "../view/Credential";
import CreateCredential from "../view/credential/CreateCredential";
import GetCredential from "../view/credential/GetCredential";
import UpdateCredential from "../view/credential/UpdateCredential";
import CreateProject from "../view/project/CreateProject";
import GetProject from "../view/project/GetProject";
import UpdateProject from "../view/project/UpdateProject";
import GetBuild from "../view/project/build/GetBuild";
import Config from "../view/Config";
import Menu from "../component/Menu";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route element={<Menu/>}>
                    <Route exact path="/project" element={<Project/>}/>
                    <Route exact path="/project/:id" element={<GetProject/>}/>
                    <Route exact path="/project/create" element={<CreateProject/>}/>
                    <Route exact path="/project/update/:id" element={<UpdateProject/>}/>
                    <Route exact path="/project/:id/build/:buildId" element={<GetBuild/>}/>
                    <Route exact path="/developer" element={<Developer/>}/>
                    <Route exact path="/developer/:id" element={<GetDeveloper/>}/>
                    <Route exact path="/developer/create" element={<CreateDeveloper/>}/>
                    <Route exact path="/developer/update/:id" element={<UpdateDeveloper/>}/>
                    <Route exact path="/secret" element={<Secret/>}/>
                    <Route exact path="/secret/:id" element={<GetSecret/>}/>
                    <Route exact path="/secret/create" element={<CreateSecret/>}/>
                    <Route exact path="/secret/update/:id" element={<UpdateSecret/>}/>
                    <Route exact path="/credential" element={<Credential/>}/>
                    <Route exact path="/credential/:id" element={<GetCredential/>}/>
                    <Route exact path="/credential/create" element={<CreateCredential/>}/>
                    <Route exact path="/credential/update/:id" element={<UpdateCredential/>}/>
                    <Route exact path="/config" element={<Config/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
