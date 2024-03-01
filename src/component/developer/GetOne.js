import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import UpdateEntity from "../util/form/UpdateEntity";
import isNull from "../../mixin/global/isNull";
import useApi from "../../api/auto/useApi";
import EditIcon from "../util/icon/EditIcon";
import BackIcon from "../util/icon/BackIcon";

export default function GetOne() {
    const navigate = useNavigate();
    const {findOneBy} = useApi();
    const {id} = useParams();
    const developer = useSelector(state => state.api?.["api-free-commit"]?.developers?.values[id]);

    useEffect(() => {
        findOneBy("api-free-commit", "developers", "id", id, "developer");
    }, []);

    if (isNull(developer)) return null;

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-center text-fairfair text-3xl">{developer.username}</h4>
                </div>
                <div>
                    <button className="badge-orange-square"
                            onClick={() => navigate(`/developer/update/${id}`)}>
                        <EditIcon size={8}/>
                    </button>
                    <button className="badge-blue-square ml-3" onClick={() => navigate('/developer')}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <UpdateEntity
                        id={id}
                        subject="developers"
                        role="admin"
                        service={"api-free-commit"}
                        fields={[
                            {
                                title: "Username",
                                name: "username",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Password",
                                name: "password",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Email",
                                name: "email",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "Roles",
                                name: "roles",
                                type: "array",
                                items: [
                                    {
                                        key: "ROLE_ADMIN",
                                        value: "ROLE_ADMIN"
                                    },
                                    {
                                        key: "ROLE_DEVELOPER",
                                        value: "ROLE_DEVELOPER"
                                    }
                                ],
                                disabled: true
                            },
                            {
                                title: "Enabled",
                                name: "enabled",
                                type: "boolean",
                                disabled: true
                            },
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        id={id}
                        subject="developers"
                        role="developer"
                        service={"api-free-commit"}
                        fields={[

                            {
                                title: "Github username",
                                name: "github_username",
                                type: "text",
                                disabled: true
                            },
                            {
                                title: "gitlab username",
                                name: "gitlab_username",
                                type: "text",
                                disabled: true
                            }
                        ]}
                    />
                </div>
            </div>

        </div>
    );
}
