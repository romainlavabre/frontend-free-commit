import {useSelector} from "react-redux";
import {useNavigate} from "react-router";

export default function GetAll() {
    const navigate = useNavigate();
    const credentials = useSelector(state => state.credential.credentials);

    const openSecret = id => {
        navigate(`/credential/${id}`)
    }

    return (
        <>
            <h4 className="font-bold">Credentials</h4>
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
                        <>
                            <tr key={credential.id}>
                                <td className="text-blue-500 hover:underline hover:cursor-pointer"
                                    onClick={() => openSecret(credential.id)}>#{credential.id}
                                </td>
                                <td>{credential.name}</td>
                                <td>*****</td>
                            </tr>
                        </>
                    ))
                }
                </tbody>
            </table>
        </>
    );
}
