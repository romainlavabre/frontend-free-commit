import {useEffect} from "react";
import api from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {load} from "../../store/user";

export default function User() {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.user);

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
                    <th>Name</th>
                    <th>Email</th>
                    <th>Granted</th>
                </tr>
                </thead>
                <tbody>
                {
                    users.map(user => (
                        <>
                            <tr key={user.id}>
                                <td className="text-blue-500 hover:underline hover:cursor-pointer">#{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email === null ? 'TODO' : user.email}</td>
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
