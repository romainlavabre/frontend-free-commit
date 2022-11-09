import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import LaunchManually from "./build/LaunchManually";
import ReloadSignatureKey from "./ReloadSignatureKey";
import isNull from "../../mixin/isNull.js";

export default function GetOne() {
    const {id} = useParams();
    const project = useSelector(state => state.project.projects.find(project => project.id == id));
    const users = useSelector(state => state.user.users);
    const credentials = useSelector(state => state.credential.credentials);

    const getUser = id => {
        return users.find(user => user.id === id);
    }

    const getCredential = id => {
        return credentials.find(credential => credential.id === id);
    }

    if (isNull(project)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <div className="flex justify-end">
                    <LaunchManually projectId={id}/>
                </div>
                <h4 className="text-center text-fairfair text-3xl my-5">{project.name}</h4>

                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td className="text-fairfair">{project.name}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{project.description}</td>
                    </tr>
                    <tr>
                        <th>Repository</th>
                        <td className="text-ovh">{project.repository}</td>
                    </tr>
                    <tr>
                        <th>Branch</th>
                        <td className="text-orange-500">{project.branch}</td>
                    </tr>
                    <tr>
                        <th>Deployment file path</th>
                        <td className="text-indigo-400">{project.spec_file_path}</td>
                    </tr>
                    <tr>
                        <th>Keep number build</th>
                        <td>{project.keep_number_build}</td>
                    </tr>
                    <tr>
                        <th>Allow concurrent execution</th>
                        <td>{project.allow_concurrent_execution ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <th>Developers</th>
                        <td>
                            {
                                project.developers_id.length === 0
                                    ? 'Nobody'
                                    : null
                            }
                            {
                                project.developers_id.map(developerId => (
                                    <div key={developerId.toString()}>
                                        <span key={developerId} className="text-green-500">
                                            {getUser(developerId).username}
                                        </span>
                                        <br/>
                                    </div>
                                ))
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>Repository credential</th>
                        <td className="text-blue-500">
                            {
                                project.repository_credential_id === null
                                    ? 'This repository is public'
                                    : getCredential(project.repository_credential_id).name
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>

                <h4 className="text-center text-fairfair text-3xl my-5">Webhook</h4>
                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th className="flex justify-center border-none">
                            <ReloadSignatureKey projectId={id}/>
                            Webhook Secret key
                        </th>
                        <td>
                            <span className="mx-4">
                            {project.signature_key}
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <th>Webhook URL</th>
                        <td>
                            <span className="text-orange-400">
                                URL
                            </span>
                            /api/guest/webhooks/build/{id}
                        </td>
                    </tr>
                    <tr>
                        <th className="flex justify-center text-red-500 border-none">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                            </svg>
                            Webhook Accept
                        </th>
                        <td>
                            <span className="text-orange-400">
                                application/json
                            </span>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
