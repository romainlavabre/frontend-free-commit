import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import EditIcon from "../util/icon/EditIcon";
import BackIcon from "../util/icon/BackIcon";
import UpdateEntity from "../util/form/UpdateEntity";
import isNull from "../../mixin/global/isNull";
import api from "../../api/api";
import useApi from "../../api/auto/useApi";

export default function GetOne() {
    const {findOneBy} = useApi();
    const navigate = useNavigate();
    const {id} = useParams();
    const secret = useSelector(state => state.api?.["api-free-commit"]?.secrets?.values[id]);
    const [projects, setProjects] = useState();

    useEffect(() => {
        findOneBy("api-free-commit", "secrets", "id", id, "developer");

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
                    <button
                        className="badge-orange-square"
                        onClick={() => navigate(`/secret/update/${id}`)}
                    >
                        <EditIcon size={8}/>
                    </button>
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
                        service="api-free-commit"
                        role="admin"
                        fields={[
                            {
                                title: "Name",
                                name: "name",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Escape char",
                                name: "escape_char",
                                type: "text",
                                disabled: true
                            }
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        subject="secrets"
                        id={id}
                        service="api-free-commit"
                        role="admin"
                        fields={[
                            {
                                title: "Environment",
                                name: "env",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Project",
                                name: "projects_id",
                                type: "array",
                                items: projects,
                                key: "project_id",
                                value: "project_name",
                                multiple: true,
                                disabled: true
                            }
                        ]}
                    />
                </div>
            </div>
        </div>
    );
}
