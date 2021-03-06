import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import api from "../../api/api";
import mixin from "../../mixin/mixin";
import {openAlert} from "../../store/util";
import {useForm} from "react-hook-form";
import {updateOne} from "../../store/project";

export default function Update() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const project = useSelector(state => state.project.projects.find(project => project !== undefined && project.id == id));
    const users = useSelector(state => state.user.users);
    const credentials = useSelector(state => state.credential.credentials);
    const {register, handleSubmit} = useForm();


    const onSubmit = async data => {
        console.log(data)
        for (let property in data) {
            if (data[property] === 'null') {
                data[property] = null;
            }

            if (project[property] == data[property]
                || (project[property] === null && data[property] === "")) {
                continue;

            }

            const payload = {project: {}};
            payload.project[property] = data[property];

            try {
                await api.project.update(project.id, property.replace('_id', ''), payload);
            } catch (e) {
                dispatch(openAlert({
                    type: 'error',
                    title: mixin.mapErrorMessage(e)
                }));

                return;
            }

        }

        const reloadedProject = await api.project.findById(id);
        dispatch(updateOne(reloadedProject));

        dispatch(openAlert({
            type: 'success',
            title: 'Successfully updated'
        }));

        navigate(`/project/${id}`);
    }

    if (mixin.isNull(project)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{project.name}</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="input-text w-full"
                                placeholder="Name"
                                defaultValue={project.name}
                                {...register("name")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Repository</label>
                            <input
                                type="repository"
                                className="input-text w-full"
                                placeholder="Repository"
                                defaultValue={project.repository}
                                {...register("repository")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                className="input-text w-full"
                                placeholder="Description"
                                defaultValue={project.description}
                                {...register("description")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Branch</label>
                            <input
                                type="text"
                                className="input-text w-full"
                                placeholder="Branch"
                                defaultValue={project.branch}
                                {...register("branch")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Number build to keep</label>
                            <input
                                type="number"
                                className="input-text w-full"
                                placeholder="Number build to keep"
                                defaultValue={project.keep_number_build}
                                {...register("keep_number_build")}
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Deployment file path (
                                <span className="text-sm italic">
                                    Start to root /
                                </span>
                                )
                            </label>
                            <input
                                type="text"
                                className="input-text w-full"
                                placeholder="Deployment spec file path"
                                defaultValue={project.spec_file_path}
                                {...register("spec_file_path")}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="checkbox"
                                id="allowConcurrentExecution"
                                className="input-checkbox"
                                defaultChecked={project.allow_concurrent_execution}
                                {...register("allow_concurrent_execution")}
                            />
                            <label
                                htmlFor="allowConcurrentExecution"
                                className="text-orange-400"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 inline mx-2"
                                     viewBox="0 0 20 20"
                                     fill="currentColor">
                                    <path fillRule="evenodd"
                                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                          clipRule="evenodd"/>
                                </svg>
                                Allow concurrent execution
                            </label>
                        </div>

                        <div className="input-group">
                            <label>Allowed developers</label>
                            <select
                                className="input-select w-full"
                                multiple
                                defaultValue={project.developers_id}
                                {...register("developers_id")}
                            >
                                {
                                    users.map(user => (
                                        <option key={user.id} value={parseInt(user.id)}>{user.username}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Repository credential</label>
                            <select
                                className="input-select w-full"
                                defaultValue={project.repository_credential_id}
                                {...register("repository_credential_id")}
                            >
                                <option value={"null"}>This repository is public</option>
                                {
                                    credentials.map(credential => (
                                        <option key={credential.id} value={credential.id}>{credential.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-submit">
                        <button type="submit" className="text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
