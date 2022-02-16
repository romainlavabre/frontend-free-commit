import {useSelector} from "react-redux";
import {useNavigate} from "react-router";
import LaunchManually from "./build/LaunchManually";
import dateFormatter from "../../mixin/dateFormatter";

export default function GetAll() {
    const navigate = useNavigate();
    const projects = useSelector(state => state.project.projects);


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
                                {
                                    project.last_build.exit_code === null
                                        ? (
                                            <>
                                                <td>
                                                </td>
                                                <td>
                                                </td>
                                            </>
                                        )
                                        : (
                                            <>
                                                <td className={project.last_build.exit_code === 0 ? 'text-green-500' : 'text-red-500'}>
                                                    {project.last_build.exit_code} ({project.last_build.exit_message !== null ? project.last_build.exit_message : 'OK'})
                                                </td>
                                                <td>
                                                    {dateFormatter(project.last_build.created_at)}
                                                </td>
                                            </>
                                        )
                                }
                                <td>
                                    <LaunchManually key={project.id} projectId={project.id}/>
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
