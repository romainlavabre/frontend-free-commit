import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import api from "../../api/api";
import mixin from "../../mixin/mixin";
import {openAlert} from "../../store/util";
import {useForm} from "react-hook-form";

export default function Update() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.users.find(user => user.id == id));
    const projects = useSelector(state => state.project.projects);
    const {register, handleSubmit} = useForm();

    const onSubmit = async data => {
        for (let property in data) {
            if (user[property] == data[property]
                || (property === 'password' && user.password === undefined && data.password === '****')) {
                continue;
            }

            const payload = {developer: {}};
            payload.developer[property] = data[property];

            try {
                await api.user.update(user.id, property.replace('_id', ''), payload);
            } catch (e) {
                dispatch(openAlert({
                    type: 'error',
                    title: mixin.mapErrorMessage(e)
                }));

                return;
            }
        }

        dispatch(openAlert({
            type: 'success',
            title: 'Successfully updated'
        }));

        navigate('/user');
    }

    if (mixin.isNull(user)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{user.username}</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="table table-auto">
                        <tr>
                            <th>Username</th>
                            <td>
                                <input type="text" className="input-text w-full"
                                       defaultValue={user.username} {...register("username")}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Password</th>
                            <td>
                                <input type="password" className="input-text w-full"
                                       defaultValue="****" {...register("password")}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Email</th>
                            <td>
                                <input type="text" className="input-text w-full"
                                       defaultValue={user.email} {...register("email")}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Github username</th>
                            <td>
                                <input type="text" className="input-text w-full"
                                       defaultValue={user.github_username} {...register("github_username")}/>
                            </td>
                        </tr>
                        <tr>
                            <th>Roles</th>
                            <td>
                                <select className="input-text w-full" defaultValue={user.roles}
                                        multiple {...register("roles")}>
                                    <option value="ROLE_ADMIN">ADMIN</option>
                                    <option value="ROLE_DEVELOPER">DEVELOPER</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <th>Projects</th>
                            <td className="text-green-500">
                                <select className="input-text w-full" defaultValue={user.projects_id}
                                        multiple {...register("projects_id")}>
                                    {
                                        projects.map(project => (
                                            <option key={project.id} value={project.id}>{project.name}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                    </table>

                    <div className="form-submit">
                        <button type="submit" className="bg-green-500 px-10 py-1 rounded mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
