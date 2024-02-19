import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import api from "../../api/api";
import useApi from "../../api/auto/useApi";
import isNull from "../../mixin/global/isNull";
import BackIcon from "../util/icon/BackIcon";
import UpdateEntity from "../util/form/UpdateEntity";

export default function Update() {
    const {findOneBy} = useApi();
    const navigate = useNavigate();
    const {id} = useParams();
    const secret = useSelector(state => state.api?.api?.secrets?.values[id]);
    const [projects, setProjects] = useState();

    useEffect(() => {
        findOneBy("api", "secrets", "id", id, "developer");

        const fetchProject = async () => {
            setProjects((await api.project.pagination(100000)).data);
        }

        fetchProject();
    }, []);

    if (isNull(projects)) return null;

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-center text-3xl">{secret?.name}</h4>
                </div>
                <div>
                    <button className="badge-blue-square ml-3" onClick={() => navigate(`/secret`)}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <UpdateEntity
                        subject="secrets"
                        id={id}
                        service="api"
                        role="admin"
                        fields={[
                            {
                                title: "Name",
                                name: "name",
                                type: "text"
                            },
                            {
                                title: "Escape char",
                                name: "escape_char",
                                type: "text"
                            }
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        subject="secrets"
                        id={id}
                        service="api"
                        role="admin"
                        fields={[
                            {
                                title: "Value",
                                name: "value",
                                type: "long-text"
                            },
                            {
                                title: "Environment",
                                name: "env",
                                type: "text"
                            },
                            {
                                title: "Project",
                                name: "projects_id",
                                type: "array",
                                items: projects,
                                key: "project_id",
                                value: "project_name",
                                multiple: true
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
