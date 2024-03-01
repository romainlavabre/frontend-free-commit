import React from "react";
import {useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import EditIcon from "../util/icon/EditIcon";
import BackIcon from "../util/icon/BackIcon";
import isNull from "../../mixin/global/isNull";

export default function GetOne() {
    const navigate = useNavigate();
    const {id} = useParams();
    const credential = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values[id]);

    if (isNull(credential)) return null;

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">{credential.name}</h4>
                </div>
                <div>
                    <button className="badge-orange-square"
                            onClick={() => navigate(`/credential/update/${id}`)}>
                        <EditIcon size={8}/>
                    </button>
                    <button className="badge-blue-square ml-3" onClick={() => navigate(`/credential`)}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>

            <hr className="my-5 w-8/12 mx-auto"/>

            <table className="table table-auto">
                <tbody>
                <tr>
                    <th>Name</th>
                    <td>{credential.name}</td>
                </tr>
                <tr>
                    <th>SSH Key</th>
                    <td>******</td>
                </tr>
                </tbody>
            </table>
        </>
    );
}
