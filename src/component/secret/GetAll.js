import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import api from "../../api/api";
import {load} from "../../store/secret";
import {useNavigate} from "react-router";

export default function GetAll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const secrets = useSelector(state => state.secret.secrets);

    useEffect(async () => {
        const secrets = await api.secret.findAll();

        dispatch(load(secrets));
    }, []);

    const openSecret = id => {
        navigate(`/secret/${id}`)
    }

    return (
        <>
            <h4 className="font-bold">Secrets</h4>
            <table className="table table-auto">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Value</th>
                    <th>Scope</th>
                </tr>
                </thead>
                <tbody>
                {
                    secrets.map(secret => (
                        <>
                            <tr key={secret.id}>
                                <td className="text-blue-500 hover:underline hover:cursor-pointer"
                                    onClick={() => openSecret(secret.id)}>#{secret.id}
                                </td>
                                <td>{secret.name}</td>
                                <td>*****</td>
                                <td>
                                    {
                                        secret.projects_id.length > 0
                                            ? <span className="text-blue-500">GLOBAL</span>
                                            : <span className="text-blue-500">DEVELOPER</span>
                                    }
                                </td>
                            </tr>
                        </>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}
