import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import useApi from "../../../api/auto/useApi";
import {useNavigate} from "react-router";
import isNull from "../../../mixin/global/isNull";
import api from "../../../api/api";
import SelectSearch2 from "../../util/form/SelectSearch2";

export default function Create() {
    const {findAll, findOneBy, create} = useApi();
    const navigation = useNavigate();
    const developers = useSelector(state => state.api?.["api-free-commit"]?.developers?.values.filter(developer => !isNull(developer)));
    const credentials = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values?.filter(credential => !isNull(credential)));
    const [projects, setProject] = useState([]);
    const [model, setModel] = useState(null);
    const nameInput = useRef();
    const descriptionInput = useRef();
    const repositoryInput = useRef();
    const keepNumberBuildInput = useRef();
    const branchInput = useRef();
    const specFilePathInput = useRef();
    const allowConcurrentExecutionInput = useRef();
    const developersIdInput = useRef();
    const secretsIdInput = useRef();
    const repositoryCredentialIdInput = useRef();

    useEffect(async () => {
        findAll("api-free-commit", "developers", "developer");
        findAll("api-free-commit", "credentials", "developer");
        setProject((await api.project.pagination(1000000)).data);
    }, []);

    const submit = async () => {
        const payload = {
            project: {
                name: nameInput.current.value,
                description: descriptionInput.current.value,
                repository: repositoryInput.current.value,
                keep_number_build: keepNumberBuildInput.current.value,
                branch: branchInput.current.value,
                spec_file_path: specFilePathInput.current.value,
                allow_concurrent_execution: allowConcurrentExecutionInput.current.value,
                developers_id: developersIdInput.current.value,
                secrets_id: isNull(secretsIdInput.current?.value) ? null : secretsIdInput.current.value,
                repository_credential_id: repositoryCredentialIdInput.current.value == 0 ? null : repositoryCredentialIdInput.current.value
            }
        };

        const id = await create("api-free-commit", "projects", payload, "admin");

        if (typeof id === "number") {
            navigation("/free-commit/project");
        }
    }

    const selectModel = async e => {
        if (e.target.value === "") {
            setModel(null);
            return;
        }

        setModel((await findOneBy("api-free-commit", "projects", "id", e.target.value, "developer")));
    }

    if (isNull(developers) || isNull(credentials)) return null;

    return (
        <>
            <div className="input-group">
                <label>By model</label>
                <select
                    className="input-select"
                    onChange={selectModel}>
                    <option></option>
                    {
                        projects.map(project => (
                            <option key={project.project_id}
                                    value={project.project_id}>{project.project_name}</option>
                        ))
                    }
                </select>
            </div>

            <div key={!isNull(model) ? model.id : "-1"}>
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text"
                            className="input-text w-full"
                            placeholder="Name"
                            defaultValue={!isNull(model) ? model.name : ""}
                            ref={nameInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>Repository</label>
                        <input
                            type="repository"
                            className="input-text w-full"
                            placeholder="Repository"
                            defaultValue={!isNull(model) ? model.repository : ""}
                            ref={repositoryInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>Description</label>
                        <textarea
                            className="input-text w-full"
                            placeholder="Description"
                            defaultValue={!isNull(model) ? model.description : ""}
                            ref={descriptionInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>Branch</label>
                        <input
                            type="text"
                            className="input-text w-full"
                            placeholder="Branch"
                            defaultValue={!isNull(model) ? model.branch : ""}
                            ref={branchInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>Number build to keep</label>
                        <input
                            type="number"
                            className="input-text w-full"
                            placeholder="Number build to keep"
                            defaultValue={!isNull(model) ? model.keep_number_build : ""}
                            ref={keepNumberBuildInput}
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
                            defaultValue={!isNull(model) ? model.spec_file_path : ""}
                            ref={specFilePathInput}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="checkbox"
                            id="allowConcurrentExecution"
                            className="input-checkbox"
                            defaultChecked={!isNull(model) ? model.allow_concurrent_execution : false}
                            ref={allowConcurrentExecutionInput}
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
                        <SelectSearch2
                            items={developers}
                            index="id"
                            value="username"
                            defaultValue={!isNull(model) ? model.developers_id : []}
                            reference={developersIdInput}
                            multiple={true}
                        />
                    </div>

                    <div className="input-group">
                        <label>Repository credential</label>
                        <select
                            className="input-select w-full"
                            defaultValue={!isNull(model) ? model.repository_credential_id : 0}
                            ref={repositoryCredentialIdInput}
                        >
                            <option value={0}>This repository is public</option>
                            {
                                credentials.map(credential => (
                                    <option key={credential.id} value={credential.id}>{credential.name}</option>
                                ))
                            }
                        </select>
                    </div>
                </div>

                <div className="form-submit">
                    <button className="text-green-500" onClick={submit}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}
