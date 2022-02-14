import {useEffect} from "react";
import api from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {load} from "../../store/project";
import {useNavigate} from "react-router";

export default function GetAll() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projects = useSelector(state => state.project.projects);

    useEffect(async () => {
        const projects = await api.project.findAll();
        dispatch(load(projects));
    }, []);

    const openProject = id => {
        navigate(`/project/${id}`)
    }

    return (
        <>
            <h4 className="font-bold">Projects</h4>
            <table className="table table-auto">
                <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Last build status</th>
                    <th>Last build at</th>
                    <th>
                        <button className="text-green-500 bg-transparent">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                            </svg>
                        </button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {
                    projects.map(project => (
                        <>
                            <tr key={project.id}>
                                <td
                                    className="text-blue-500 hover:underline hover:cursor-pointer"
                                    onClick={() => openProject(project.id)}>
                                    #{project.id}
                                </td>
                                <td>{project.name}</td>
                                <td></td>
                                <td></td>
                                <td>
                                    <button className="text-green-500 hover:text-green-600">
                                        <svg xmlns="http://www.w3.org/2000/svg"
                                             className="h-8 w-8" fill="none"
                                             viewBox="0 0 24 24"
                                             stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                        </svg>
                                    </button>
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
