import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate, useParams} from "react-router";
import {openAlert} from "../../store/util";

export default function GetOne() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projects = useSelector(state => state.project.projects);
    const users = useSelector(state => state.user.users);
    const [project, setProject] = useState(null);

    useEffect(() => {
        const project = projects.find(project => project.id == id);

        if (projects.length > 0 && project === undefined) {
            dispatch(openAlert({
                type: 'error',
                title: 'Project not found'
            }));
            navigate('/project')
        }

        setProject(project);
    }, [projects]);

    const getUser = id => {
        return users.find(user => user.id === id);
    }


    if (project === null) {
        return null;
    }

    console.log(users);
    console.log(projects)

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{project.name}</h4>

                <table className="table table-auto">
                    <tr>
                        <th>Name</th>
                        <td>{project.name}</td>
                    </tr>
                    <tr>
                        <th>Description</th>
                        <td>{project.description}</td>
                    </tr>
                    <tr>
                        <th>Repository</th>
                        <td>{project.repository}</td>
                    </tr>
                    <tr>
                        <th>Branch</th>
                        <td>{project.branch}</td>
                    </tr>
                    <tr>
                        <th>Deployment file path</th>
                        <td>{project.spec_file_path}</td>
                    </tr>
                    <tr>
                        <th>Keep number build</th>
                        <td>{project.keep_number_build}</td>
                    </tr>
                    <tr>
                        <th>Allow concurrent execution</th>
                        <td>{project.allow_concurrent_execution ? 'Yes' : 'No'}</td>
                    </tr>
                    <tr>
                        <th>Developers</th>
                        <td>
                            {console.log(project.developers_id)}
                            {
                                project.developers_id.map(developerId => (
                                    <>
                                        <span key={developerId} className="text-green-500">
                                            {getUser(developerId).username}
                                        </span>
                                        <br/>
                                    </>
                                ))
                            }
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}
