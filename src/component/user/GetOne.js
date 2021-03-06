import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import mixin from "../../mixin/mixin";

export default function GetOne() {
    const {id} = useParams();
    const user = useSelector(state => state.user.users.find(user => user.id == id));
    const projects = useSelector(state => state.project.projects);


    const getProject = id => {
        return projects.find(project => project.id == id);
    }

    if (mixin.isNull(user)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{user.username}</h4>

                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th>Username</th>
                        <td>{user.username}</td>
                    </tr>
                    <tr>
                        <th>Password</th>
                        <td>******</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{!mixin.isNull(user.email) ? user.email : 'TODO'}</td>
                    </tr>
                    <tr>
                        <th>Github username</th>
                        <td className="text-yellow-600">
                            {!mixin.isNull(user.github_username) ? user.github_username : 'TODO'}
                        </td>
                    </tr>
                    <tr>
                        <th>Gitlab username</th>
                        <td className="text-yellow-600">
                            {!mixin.isNull(user.gitlab_username) ? user.gitlab_username : 'TODO'}
                        </td>
                    </tr>
                    <tr>
                        <th>Roles</th>
                        <td>
                            {
                                user.roles.map((role, index) => (
                                    <div key={index.toString()}>
                                    <span
                                        className={role === 'ROLE_ADMIN' ? 'text-red-500' : 'text-blue-500'}>{role}</span>
                                        <br/>
                                    </div>
                                ))
                            }
                        </td>
                    </tr>
                    <tr>
                        <th>Projects</th>
                        <td className="text-green-500">
                            {
                                user.projects_id.length === 0
                                    ? 'TODO'
                                    : user.projects_id.map(id => (
                                        <div key={id.toString()}>
                                            <span>{getProject(id).name}</span>
                                            <br/>
                                        </div>
                                    ))
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
