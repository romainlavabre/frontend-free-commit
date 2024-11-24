import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Login from "../component/login/Login";
import ProjectEntrypoint from "../component/free-commit/project/ProjectEntrypoint";
import Menu from "../component/free-commit/Menu";
import SecretEntrypoint from "../component/free-commit/secret/SecretEntrypoint";
import CredentialsEntrypoint from "../component/free-commit/credentials/CredentialEntrypoint";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route element={<Menu/>}>
                    <Route exact path="/free-commit/project" element={<ProjectEntrypoint/>}/>
                    <Route exact path="/free-commit/developer" element={null}/>
                    <Route exact path="/free-commit/developer/:id" element={null}/>
                    <Route exact path="/free-commit/developer/create" element={null}/>
                    <Route exact path="/free-commit/developer/update/:id" element={null}/>
                    <Route exact path="/free-commit/secret" element={<SecretEntrypoint/>}/>
                    <Route exact path="/free-commit/credential" element={<CredentialsEntrypoint/>}/>
                    <Route exact path="/free-commit/config" element={null}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
