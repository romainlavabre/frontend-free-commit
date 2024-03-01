import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import LaunchManually from "./build/LaunchManually";
import isNull from "../../mixin/global/isNull.js";
import EditIcon from "../util/icon/EditIcon";
import BackIcon from "../util/icon/BackIcon";
import Delete from "./Delete";
import useApi from "../../api/auto/useApi";
import UpdateEntity from "../util/form/UpdateEntity";
import Webhook from "./webhook/Webhook";
import GetCompleteBuilds from "./build/GetCompleteBuilds";

export default function GetOne() {
    const navigate = useNavigate();
    const {findOneBy, findAll} = useApi();
    const {id} = useParams();
    const project = useSelector(state => state.api?.["api-free-commit"]?.projects?.values[id]);
    const developers = useSelector(state => state.api?.["api-free-commit"]?.developers?.values?.filter(user => !isNull(user)));
    const credentials = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values?.filter(credential => !isNull(credential)));

    useEffect(() => {
        findOneBy("api-free-commit", "projects", "id", id, "developer");
        findAll("api-free-commit", "credentials", "developer");
        findAll("api-free-commit", "developers", "developer");
    }, []);

    if (isNull(project) || isNull(credentials) || isNull(developers)) return null;

    return (
        <>
            <div className="flex justify-between mb-3">
                <h4 className="text-center text-fairfair text-3xl">{project?.name}</h4>

                <div>
                    <LaunchManually projectId={id}/>
                    <button
                        className="badge-orange-square ml-3"
                        onClick={() => navigate(`/project/update/${id}`)}
                        title="update"
                    >
                        <EditIcon size={8}/>
                    </button>
                    <Delete id={id}/>
                    <button
                        className="badge-blue-square ml-5"
                        onClick={() => navigate('/project')}
                        title="back"
                    >
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <UpdateEntity
                        service="api-free-commit"
                        subject="projects"
                        role="admin"
                        id={id}
                        fields={[
                            {
                                title: "Name",
                                name: "name",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Description",
                                name: "description",
                                type: "long-text",
                                disabled: true
                            },
                            {
                                title: "Number build to keep",
                                name: "keep_number_build",
                                type: "number",
                                disabled: true
                            },
                            {
                                title: "Allow concurrent execution",
                                name: "allow_concurrent_execution",
                                type: "boolean",
                                disabled: true
                            },
                            {
                                title: "Repository credential",
                                name: "repository_credential_id",
                                type: "array",
                                items: credentials,
                                key: "id",
                                value: "name",
                                disabled: true
                            }
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        service="api-free-commit"
                        subject="projects"
                        role="admin"
                        id={id}
                        fields={[
                            {
                                title: "Repository",
                                name: "repository",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Branch",
                                name: "branch",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Deployment file path (Start to project root /)",
                                name: "spec_file_path",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Allowed developers",
                                name: "developers_id",
                                type: "array",
                                items: developers,
                                key: "id",
                                value: "username",
                                multiple: true,
                                disabled: true
                            }
                        ]}
                    />
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <Webhook/>
                </div>
                <div className="col-span-1">
                    <GetCompleteBuilds/>
                </div>
            </div>
        </>
    );
}
