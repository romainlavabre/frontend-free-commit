import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Login from "../view/Login";
import Project from "../view/free-commit/Project";
import Developer from "../view/free-commit/Developer";
import CreateDeveloper from "../view/free-commit/developer/CreateDeveloper";
import GetDeveloper from "../view/free-commit/developer/GetDeveloper";
import UpdateDeveloper from "../view/free-commit/developer/UpdateDeveloper";
import Secret from "../view/free-commit/Secret";
import CreateSecret from "../view/free-commit/secret/CreateSecret";
import UpdateSecret from "../view/free-commit/secret/UpdateSecret";
import GetSecret from "../view/free-commit/secret/GetSecret";
import Credential from "../view/free-commit/Credential";
import CreateCredential from "../view/free-commit/credential/CreateCredential";
import GetCredential from "../view/free-commit/credential/GetCredential";
import UpdateCredential from "../view/free-commit/credential/UpdateCredential";
import CreateProject from "../view/free-commit/project/CreateProject";
import GetProject from "../view/free-commit/project/GetProject";
import UpdateProject from "../view/free-commit/project/UpdateProject";
import GetBuild from "../view/free-commit/project/build/GetBuild";
import Config from "../view/free-commit/Config";
import Menu from "../component/Menu";
import FreePingConfig from "../view/free-ping/Config";
import Ping from "../view/free-ping/Ping";
import GetPing from "../view/free-ping/ping/GetPing";
import Outage from "../view/free-ping/Outage";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route element={<Menu/>}>
                    <Route exact path="/free-commit/project" element={<Project/>}/>
                    <Route exact path="/free-commit/project/:id" element={<GetProject/>}/>
                    <Route exact path="/free-commit/project/create" element={<CreateProject/>}/>
                    <Route exact path="/free-commit/project/update/:id" element={<UpdateProject/>}/>
                    <Route exact path="/free-commit/project/:id/build/:buildId" element={<GetBuild/>}/>
                    <Route exact path="/free-commit/developer" element={<Developer/>}/>
                    <Route exact path="/free-commit/developer/:id" element={<GetDeveloper/>}/>
                    <Route exact path="/free-commit/developer/create" element={<CreateDeveloper/>}/>
                    <Route exact path="/free-commit/developer/update/:id" element={<UpdateDeveloper/>}/>
                    <Route exact path="/free-commit/secret" element={<Secret/>}/>
                    <Route exact path="/free-commit/secret/:id" element={<GetSecret/>}/>
                    <Route exact path="/free-commit/secret/create" element={<CreateSecret/>}/>
                    <Route exact path="/free-commit/secret/update/:id" element={<UpdateSecret/>}/>
                    <Route exact path="/free-commit/credential" element={<Credential/>}/>
                    <Route exact path="/free-commit/credential/:id" element={<GetCredential/>}/>
                    <Route exact path="/free-commit/credential/create" element={<CreateCredential/>}/>
                    <Route exact path="/free-commit/credential/update/:id" element={<UpdateCredential/>}/>
                    <Route exact path="/free-commit/config" element={<Config/>}/>
                    <Route exact path="/free-ping/ping" element={<Ping/>}/>
                    <Route exact path="/free-ping/ping/:id" element={<GetPing/>}/>
                    <Route exact path="/free-ping/outage" element={<Outage/>}/>
                    <Route exact path="/free-ping/config" element={<FreePingConfig/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
