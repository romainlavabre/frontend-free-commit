import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import LaunchManually from "./build/LaunchManually";
import ReloadSignatureKey from "./ReloadSignatureKey";

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

    if (project === null) {
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
                                    <>
                                        <span key={developerId} className="text-green-500">
                                            {getUser(developerId).username}
                                        </span>
                                        <br/>
                                    </>
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
                </table>
            </div>
        </>
    );
}
