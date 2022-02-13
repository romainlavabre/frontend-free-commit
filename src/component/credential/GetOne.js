import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import api from "../../api/api";
import {load} from "../../store/credential";
import {useNavigate, useParams} from "react-router";
import {openAlert} from "../../store/util";
import mixin from "../../mixin/mixin";

export default function GetOne() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const credentials = useSelector(state => state.credential.credentials);
    const [credential, setCredential] = useState(null);

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
                title: 'Secret not found'
            }));

            navigate('/credential');
        } else {
            setCredential(credentialFound);
        }
    }

    if (mixin.isNull(credential)) {
        return null;
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{credential.name}</h4>

                <table className="table table-auto">
                    <tr>
                        <th>Name</th>
                        <td>{credential.name}</td>
                    </tr>
                    <tr>
                        <th>SSH Key</th>
                        <td>******</td>
                    </tr>
                </table>
            </div>
        </>
    );
}
