import {useEffect} from "react";
import api from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {load} from "../../store/user";
import mixin from "../../mixin/mixin";
import {useNavigate} from "react-router";

export default function User() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const users = useSelector(state => state.user.user);

    const openUser = id => {
        navigate(`/user/update/${id}`);
    }

    useEffect(async () => {
        const users = await api.user.findAll();
        dispatch(load(users));
    }, []);

    return (
        <>
            <h4 className="font-bold">Users</h4>
            <table className="table table-auto">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Granted</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user => (
                        <>
                            <tr key={user.id}>
                                <td className="text-blue-500 hover:underline hover:cursor-pointer"
                                    onClick={() => openUser(user.id)}>#{user.id}</td>
                                <td>{user.username}</td>
                                <td>{mixin.isNull(user.email) || user.email.length === 0 ? 'TODO' : user.email}</td>
                                <td>
                                    {
                                        user.roles.includes("ROLE_ADMIN")
                                            ? <span className="text-red-500">ADMIN</span>
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