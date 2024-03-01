import {useNavigate, useParams} from "react-router";
import React from "react";
import GetOne from "../../../component/free-commit/credential/GetOne";
import useAxiosConfig from "../../../use/useAxiosConfig";

export default function GetCredential() {
    const {id} = useParams();
    const navigate = useNavigate();
    useAxiosConfig();

    return (
        <div className="w-full">

            <GetOne/>
        </div>
    );
}
