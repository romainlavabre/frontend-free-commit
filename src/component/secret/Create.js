import {useNavigate} from "react-router";
import useApi from "../../api/auto/useApi";
import {useEffect, useRef, useState} from "react";
import api from "../../api/api";
import SelectSearch2 from "../util/form/SelectSearch2";
import isNull from "../../mixin/global/isNull";

export default function Create() {
    const {create} = useApi();
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const nameInput = useRef();
    const valueInput = useRef();
    const envInput = useRef();
    const projectsIdInput = useRef();

    useEffect(async () => {
        const res = (await api.project.pagination(10000)).data;

        setProjects(res);
    }, []);

    const submit = async () => {
        const payload = {
            secret: {
                name: nameInput.current.value,
                value: valueInput.current.value,
                env: envInput.current.value,
                projects_id: projectsIdInput.current
            }
        };

        await create("api-free-commit", "secrets", payload, "admin");

        navigate("/secret");
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text" className="input-text w-full"
                            pattern="[A-Z0-9-_]+"
                            title="[A-Z0-9-_]+"
                            placeholder="CLIENT_SECRET"
                            ref={nameInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>Environment</label>
                        <input
                            className="input-text w-full"
                            placeholder="Environment (information)"
                            ref={envInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>Value</label>
                        <textarea
                            className="input-text w-full"
                            placeholder="Secret value"
                            ref={valueInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>
                            Scope (
                            <span className="text-sm italic">
                                    If you let this field empty, the default scope is global
                                </span>
                            )
                        </label>
                        <SelectSearch2
                            key={!isNull(projects) ? projects.length : -1}
                            items={projects}
                            index="project_id"
                            value="project_name"
                            reference={projectsIdInput}
                            defaultValue={[]}
                            multiple={true}
                        />
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
    )
}
