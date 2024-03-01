import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import isNull from "../../mixin/global/isNull";
import React, {useEffect} from "react";
import useApi from "../../api/auto/useApi";
import PlusIcon from "../util/icon/PlusIcon";
import github from "../../assets/img/github.png";
import gitlab from "../../assets/img/gitlab.svg";

export default function GetAll() {
    const {findAll} = useApi();
    const navigate = useNavigate();
    const credentials = useSelector(state => state.api?.["api-free-commit"]?.credentials?.values.filter(credential => !isNull(credential)));

    useEffect(() => {
        findAll("api-free-commit", "credentials", "developer");
    }, []);

    const openSecret = id => {
        navigate(`/credential/${id}`)
    }

    if (isNull(credentials)) return null;

    return (
        <>
            <div className="flex justify-between">
                <div>
                    <h4 className="text-3xl">Credentials</h4>
                </div>
                <div>
                    <button className="badge-green-square"
                            onClick={() => navigate('/credential/create')}>
                        <PlusIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="my-5 w-8/12 mx-auto"/>
            <table className="table table-auto">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>SSH key</th>
                </tr>
                </thead>
                <tbody>
                {
                    credentials.length === 0
                        ? (
                            <tr>
                                <td colSpan="4">No data available</td>
                            </tr>
                        )
                        : null
                }
                {
                    credentials.map(credential => (
                        <tr key={credential.id.toString()}>
                            <td className="text-blue-500 hover:underline hover:cursor-pointer"
                                onClick={() => openSecret(credential.id)}>#{credential.id}
                            </td>
                            <td>{credential.name}</td>
                            <td>*****</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
            <hr className="my-10 w-8/12 mx-auto"/>
            <div>
                <h1 className="italic">Supported</h1>

                <div className="flex w-full items-center">
                    <div>
                        <img src={github} className="mx-3"/>
                    </div>
                    <div>
                        <img src={gitlab} className="mx-3"/>
                    </div>
                </div>
            </div>
        </>
    );
}
