import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import api from "../../api/api";
import mixin from "../../mixin/mixin";
import {openAlert} from "../../store/util";
import {useForm} from "react-hook-form";
import {updateOne} from "../../store/secret";

export default function Update() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const secret = useSelector(state => state.secret.secrets.find(secret => secret.id == id));
    const projects = useSelector(state => state.project.projects);
    const {register, handleSubmit} = useForm();


    const onSubmit = async data => {
        for (let property in data) {
            if (secret[property] == data[property]
                || (secret[property] === null && data[property] === "")
                || (property === 'value' && secret.value === undefined && data.value === '****')) {
                continue;
            }

            const payload = {secret: {}};
            payload.secret[property] = data[property];

            try {
                await api.secret.update(secret.id, property.replace('_id', ''), payload);
                const secretReloaded = await api.secret.findById(secret.id);
                dispatch(updateOne(secretReloaded));
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

        navigate('/secret');
    }

    if (mixin.isNull(secret)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{secret.name}</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="table table-auto">
                        <tbody>
                        <tr>
                            <th>Name</th>
                            <td>
                                <input
                                    type="text"
                                    className="input-text w-full"
                                    defaultValue={secret.name}
                                    pattern="[A-Z0-9-_]+"
                                    title="[A-Z0-9-_]+"
                                    placeholder="CLIENT_SECRET" {...register("name")}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Value</th>
                            <td>
                                <textarea
                                    className="input-text w-full"
                                    defaultValue="****" {...register("value")}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>Scope</th>
                            <td>
                                <select
                                    className="input-text w-full"
                                    defaultValue={secret.projects_id}
                                    multiple
                                    {...register("projects_id")}
                                >
                                    <option className="text-red-500" value="">PUBLIC</option>
                                    {
                                        projects.map(project => (
                                            <option className="text-green-500" key={project.id}
                                                    value={project.id}>{project.name}</option>
                                        ))
                                    }
                                </select>
                            </td>
                        </tr>
                        </tbody>
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
