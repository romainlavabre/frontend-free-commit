import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React, {useEffect} from "react";
import useApi from "../../api/auto/useApi";
import isNull from "../../mixin/global/isNull";
import BackIcon from "../util/icon/BackIcon";
import UpdateEntity from "../util/form/UpdateEntity";

export default function Update() {
    const navigate = useNavigate();
    const {findOneBy} = useApi();
    const {id} = useParams();
    const developer = useSelector(state => state.api?.api?.developers?.values[id]);

    useEffect(() => {
        findOneBy("api", "developers", "id", id, "developer");
    }, []);

    if (isNull(developer)) return null;

    return (
        <div>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-center text-fairfair text-3xl">{developer.username}</h4>
                </div>
                <div>
                    <button className="badge-blue-square ml-3" onClick={() => navigate(`/developer/${id}`)}>
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
                        service={"api"}
                        fields={[
                            {
                                title: "Username",
                                name: "username",
                                type: "text"
                            },
                            {
                                title: "Password",
                                name: "password",
                                type: "text"
                            },
                            {
                                title: "Email",
                                name: "email",
                                type: "text"
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
                                ]
                            },
                            {
                                title: "Enabled",
                                name: "enabled",
                                type: "boolean"
                            },
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        id={id}
                        subject="developers"
                        role="admin"
                        service={"api"}
                        fields={[

                            {
                                title: "Github username",
                                name: "github_username",
                                type: "text"
                            },
                            {
                                title: "gitlab username",
                                name: "gitlab_username",
                                type: "text"
                            }
                        ]}
                    />
                </div>
            </div>

        </div>
    );
}
