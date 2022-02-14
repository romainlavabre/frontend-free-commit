import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import api from "../../api/api";
import {updateOne} from "../../store/project";
import {openAlert} from "../../store/util";
import mixin from "../../mixin/mixin";
import {useNavigate} from "react-router";

export default function Create() {
    const dispatch = useDispatch();
    const {register, handleSubmit} = useForm();
    const users = useSelector(state => state.user.users);
    const credentials = useSelector(state => state.credential.credentials);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        const payload = {
            project: {
                name: data.name,
                description: data.description,
                repository: data.repository,
                keep_number_build: data.keepNumberBuild,
                branch: data.branch,
                spec_file_path: data.specFilePath,
                allow_concurrent_execution: data.allowConcurrentExecution,
                developers_id: data.developers,
                secrets_id: data.secrets,
                repository_credential_id: data.repositoryCredentialId
            }
        };

        try {
            const project = await api.project.create(payload);
            dispatch(updateOne(project));
            dispatch(openAlert({
                type: 'success',
                title: 'Successfully created'
            }));
            navigate(`/project`);
        } catch (e) {
            dispatch(openAlert({
                type: 'error',
                title: mixin.mapErrorMessage(e)
            }));
        }
    }


    return (
        <>
            <div className="bg-light p-10 mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text"
                                className="input-text w-full"
                                placeholder="Name"
                                {...register("name")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Repository</label>
                            <input
                                type="repository"
                                className="input-text w-full"
                                placeholder="Repository"
                                {...register("repository")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                className="input-text w-full"
                                placeholder="Description"
                                {...register("description")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Branch</label>
                            <input
                                type="text"
                                className="input-text w-full"
                                placeholder="Branch"
                                {...register("branch")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Number build to keep</label>
                            <input
                                type="number"
                                className="input-text w-full"
                                placeholder="Number build to keep"
                                {...register("keepNumberBuild")}
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
                                {...register("specFilePath")}
                            />
                        </div>

                        <div className="input-group">
                            <input
                                type="checkbox"
                                id="allowConcurrentExecution"
                                className="input-checkbox"
                                {...register("allowConcurrentExecution")}
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
                                {...register("developers")}
                            >
                                {
                                    users.map(user => (
                                        <option key={user.id} value={user.id}>{user.username}</option>
                                    ))
                                }
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Repository credential</label>
                            <select
                                className="input-select w-full"
                                {...register("repositoryCredentialId")}
                            >
                                <option value={null}>This repository is public</option>
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
