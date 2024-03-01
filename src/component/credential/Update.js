import {useNavigate, useParams} from "react-router";
import {useSelector} from "react-redux";
import React from "react";
import BackIcon from "../util/icon/BackIcon";
import UpdateEntity from "../util/form/UpdateEntity";

export default function Update() {
    const {id} = useParams();
    const navigate = useNavigate();
    const credential = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values[id]);


    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">{credential?.name}</h4>
                </div>
                <div>
                    <button className="badge-gray-square"
                            onClick={() => navigate(`/credential/${id}`)}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="col-span-1">
                    <UpdateEntity
                        id={id}
                        subject="credentials"
                        service="api-free-commit"
                        role="admin"
                        fields={[
                            {
                                title: "Name",
                                name: "name",
                                type: "text"
                            }
                        ]}
                    />
                </div>
                <div className="col-span-1">
                    <UpdateEntity
                        id={id}
                        subject="credentials"
                        service="api-free-commit"
                        role="admin"
                        fields={[
                            {
                                title: "SSH Key",
                                name: "ssh_key",
                                type: "long-text",
                                formatter: () => {
                                    return ""
                                }
                            }
                        ]}
                    />
                </div>
            </div>
        </>
    );
}
