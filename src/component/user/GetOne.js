import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "../../api/api";
import {load} from "../../store/user";
import {useNavigate, useParams} from "react-router";
import {openAlert} from "../../store/util";
import mixin from "../../mixin/mixin";

export default function GetOne() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.user.users);
    const projects = useSelector(state => state.project.projects);
    const [user, setUser] = useState(null);

    useEffect(async () => {
        if (users.length === 0) {
            const users = await api.user.findAll();
            dispatch(load(users));
            return;
        }

        loadUser();
    }, []);

    useEffect(() => {
        loadUser();
    }, [users]);

    const loadUser = () => {
        const userFound = users.find(user => user.id == id);

        if (mixin.isNull(userFound)) {
            dispatch(openAlert({
                type: 'warning',
                title: 'User not found'
            }));

            navigate('/user');
        } else {
            setUser(userFound);
        }
    }

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
                        <th>Roles</th>
                        <td>
                            {
                                user.roles.map(role => (
                                    <>
                                    <span
                                        className={role === 'ROLE_ADMIN' ? 'text-red-500' : 'text-blue-500'}>{role}</span>
                                        <br/>
                                    </>
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
                                        <>
                                            <span>{getProject(id).name}</span>
                                            <br/>
                                        </>
                                    ))
                            }
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}
