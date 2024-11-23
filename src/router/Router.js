import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import React from "react";
import Login from "../component/login/Login";
import ProjectEntrypoint from "../component/free-commit/project/ProjectEntrypoint";
import Menu from "../component/free-commit/Menu";

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Login/>}/>
                <Route element={<Menu/>}>
                    <Route exact path="/free-commit/project" element={<ProjectEntrypoint/>}/>
                    <Route exact path="/free-commit/project/:id" element={null}/>
                    <Route exact path="/free-commit/project/create" element={null}/>
                    <Route exact path="/free-commit/project/update/:id" element={null}/>
                    <Route exact path="/free-commit/project/:id/build/:buildId" element={null}/>
                    <Route exact path="/free-commit/developer" element={null}/>
                    <Route exact path="/free-commit/developer/:id" element={null}/>
                    <Route exact path="/free-commit/developer/create" element={null}/>
                    <Route exact path="/free-commit/developer/update/:id" element={null}/>
                    <Route exact path="/free-commit/secret" element={null}/>
                    <Route exact path="/free-commit/secret/:id" element={null}/>
                    <Route exact path="/free-commit/secret/create" element={null}/>
                    <Route exact path="/free-commit/secret/update/:id" element={null}/>
                    <Route exact path="/free-commit/credential" element={null}/>
                    <Route exact path="/free-commit/credential/:id" element={null}/>
                    <Route exact path="/free-commit/credential/create" element={null}/>
                    <Route exact path="/free-commit/credential/update/:id" element={null}/>
                    <Route exact path="/free-commit/config" element={null}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
