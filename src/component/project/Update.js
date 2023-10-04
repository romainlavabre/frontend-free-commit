import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import UpdateEntity from "../util/form/UpdateEntity";
import isNull from "../../mixin/global/isNull";
import useApi from "../../api/auto/useApi";
import BackIcon from "../util/icon/BackIcon";

export default function Update() {
    const navigate = useNavigate();
    const {findOneBy, findAll} = useApi();
    const {id} = useParams();
    const project = useSelector(state => state.api?.api?.projects?.values[id]);
    const developers = useSelector(state => state.api?.api?.developers?.values?.filter(user => !isNull(user)));
    const credentials = useSelector(state => state.api?.api?.credentials?.values?.filter(credential => !isNull(credential)));

    useEffect(() => {
        findOneBy("api", "projects", "id", id, "developer");
        findAll("api", "credentials", "developer");
        findAll("api", "developers", "developer");
    }, []);


    if (isNull(credentials) || isNull(developers)) return null;

    return (
        <>
            <div className="flex justify-between mb-3">
                <h4 className="text-center text-fairfair text-3xl">{project?.name}</h4>
                <button className="badge-blue-square" onClick={() => navigate(`/project/${id}`)}>
                    <BackIcon size={8}/>
                </button>
            </div>
            <hr/>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <UpdateEntity
                        service="api"
                        subject="projects"
                        role="admin"
                        id={id}
                        fields={[
                            {
                                title: "Name",
                                name: "name",
                                type: "text"
                            },
                            {
                                title: "Description",
                                name: "description",
                                type: "long-text"
                            },
                            {
                                title: "Number build to keep",
                                name: "keep_number_build",
                                type: "number"
                            },
                            {
                                title: "Allow concurrent execution",
                                name: "allow_concurrent_execution",
                                type: "boolean"
                            },
                            {
                                title: "Repository credential",
                                name: "repository_credential_id",
                                type: "array",
                                items: credentials,
                                key: "id",
                                value: "name"
                            }
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        service="api"
                        subject="projects"
                        role="admin"
                        id={id}
                        fields={[
                            {
                                title: "Repository",
                                name: "repository",
                                type: "text"
                            },
                            {
                                title: "Branch",
                                name: "branch",
                                type: "text"
                            },
                            {
                                title: "Deployment file path (Start to project root /)",
                                name: "spec_file_path",
                                type: "text"
                            },
                            {
                                title: "Allowed developers",
                                name: "developers_id",
                                type: "array",
                                items: developers,
                                key: "id",
                                value: "username",
                                multiple: true
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
