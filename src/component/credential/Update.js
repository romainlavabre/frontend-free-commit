import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import api from "../../api/api";
import {load} from "../../store/credential";
import mixin from "../../mixin/mixin";
import {openAlert} from "../../store/util";
import {useForm} from "react-hook-form";

export default function Update() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const credentials = useSelector(state => state.credential.credentials);
    const [credential, setUser] = useState(null);
    const {register, handleSubmit} = useForm();

    useEffect(async () => {
        if (credentials.length === 0) {
            const credentials = await api.credential.findAll();
            dispatch(load(credentials));
            return;
        }

        loadCredential();
    }, []);

    useEffect(() => {
        loadCredential();
    }, [credentials]);

    const loadCredential = () => {
        const credentialFound = credentials.find(credential => credential.id == id);

        if (mixin.isNull(credentialFound)) {
            dispatch(openAlert({
                type: 'warning',
                title: 'Credential not found'
            }));

            navigate('/credential');
        } else {
            setUser(credentialFound);
        }
    }

    const onSubmit = async data => {
        for (let property in data) {
            if (credential[property] == data[property]
                || (credential[property] === null && data[property] === "")
                || (property === 'ssh_key' && credential.ssh_key === undefined && data.ssh_key === '****')) {
                continue;
            }

            const payload = {credential: {}};
            payload.credential[property] = data[property];

            try {
                await api.credential.update(credential.id, property.replace('_id', ''), payload);
            } catch (e) {
                dispatch(openAlert({
                    type: 'error',
                    title: mixin.mapErrorMessage(e)
                }));

                return;
            }
        }

        dispatch(openAlert({
            type: 'success',
            title: 'Successfully updated'
        }));

        navigate('/credential');
    }

    if (mixin.isNull(credential)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{credential.name}</h4>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <table className="table table-auto">
                        <tr>
                            <th>Name</th>
                            <td>
                                <input
                                    type="text"
                                    className="input-text w-full"
                                    defaultValue={credential.name}
                                    pattern="[A-Z0-9-_]+"
                                    title="[A-Z0-9-_]+"
                                    placeholder="NAME" {...register("name")}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th>SSH Key</th>
                            <td>
                                <textarea
                                    className="input-text w-full"
                                    defaultValue="****" {...register("ssh_key")}
                                />
                            </td>
                        </tr>
                    </table>

                    <div className="form-submit">
                        <button type="submit" className="bg-green-500 px-10 py-1 rounded mt-3">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20"
                                 fill="currentColor">
                                <path fillRule="evenodd"
                                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                      clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}