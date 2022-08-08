import React from "react";
import {useSelector} from "react-redux";
import {useParams} from "react-router";
import mixin from "../../mixin/mixin";

export default function GetOne() {
    const {id} = useParams();
    const secret = useSelector(state => state.secret.secrets.find(secret => secret.id == id));
    const projects = useSelector(state => state.project.projects);


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
                    <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{secret.name}</td>
                    </tr>
                    <tr>
                        <th>Value</th>
                        <td>******</td>
                    </tr>
                    <tr>
                        <th>Escape char</th>
                        <td>{secret.escape_char}</td>
                    </tr>
                    <tr>
                        <th>Projects</th>
                        <td>
                            {
                                secret.projects_id.length === 0
                                    ? (
                                        <span className="text-red-500">PUBLIC</span>
                                    )
                                    : secret.projects_id.map(id => (
                                        <div key={id.toString()}>
                                            <span className="text-green-500">{getProject(id).name}</span>
                                            <br/>
                                        </div>
                                    ))
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
