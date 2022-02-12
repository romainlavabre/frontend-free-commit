import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "../../api/api";
import {load} from "../../store/secret";
import {useNavigate, useParams} from "react-router";
import {openAlert} from "../../store/util";
import mixin from "../../mixin/mixin";

export default function GetOne() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const secrets = useSelector(state => state.secret.secrets);
    const projects = useSelector(state => state.project.projects);
    const [secret, setSecret] = useState(null);

    useEffect(async () => {
        if (secrets.length === 0) {
            const secrets = await api.secret.findAll();
            dispatch(load(secrets));
            return;
        }

        loadSecret();
    }, []);

    useEffect(() => {
        loadSecret();
    }, [secrets]);

    const loadSecret = () => {
        const secretFound = secrets.find(secret => secret.id == id);

        if (mixin.isNull(secretFound)) {
            dispatch(openAlert({
                type: 'warning',
                title: 'Secret not found'
            }));

            navigate('/secret');
        } else {
            setSecret(secretFound);
        }
    }

    const getProject = id => {
        return projects.find(project => project.id == id);
    }

    if (mixin.isNull(secret)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{secret.secretname}</h4>

                <table className="table table-auto">
                    <tr>
                        <th>Name</th>
                        <td>{secret.name}</td>
                    </tr>
                    <tr>
                        <th>Value</th>
                        <td>******</td>
                    </tr>
                    <tr>
                        <th>Projects</th>
                        <td>
                            {
                                secret.project_id === null || getProject(secret.project_id) === undefined
                                    ? (
                                        <span className="text-red-500">GLOBAL</span>
                                    )
                                    : (
                                        <span className="text-green-500">{getProject(secret.project_id).name}</span>
                                    )
                            }
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}
