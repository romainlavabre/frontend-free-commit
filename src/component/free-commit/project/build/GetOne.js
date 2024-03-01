import {useParams} from "react-router";
import React, {useEffect, useState} from "react";
import api from "../../../../api/api";
import {useSelector} from "react-redux";
import dateFormatter from "../../../../mixin/global/dateFormatter";
import isNull from "../../../../mixin/global/isNull.js";

export default function GetOne() {
    const {buildId} = useParams();
    const project = useSelector(state => state.api?.["api-free-commit"]?.projects?.values?.find(project => !isNull(project) && project.id == buildId));
    const [build, setBuild] = useState(null);

    useEffect(async () => {
        const build = await api.build.findById(buildId);

        setBuild(build);
    }, []);

    const getMinutes = () => {
        const d2 = new Date(build.completed_at);
        const d1 = new Date(build.created_at);
        const diffMs = +d2 - +d1;
        const diffMins = Math.floor((diffMs / 1000) / 60);

        return diffMins;
    }

    if (isNull(build) || isNull(project)) return null;


    return (
        <>
            <div className="bg-light p-10 mt-4">
                <h4 className="text-center text-fairfair text-3xl my-5">{project.name}</h4>

                <table className="table table-auto">
                    <tbody>
                    <tr>
                        <th>Ref</th>
                        <td className="text-blue-500">#{build.id}</td>
                    </tr>
                    <tr>
                        <th>Exit code</th>
                        <td className={build.exit_code === 0 ? 'text-green-500' : 'text-red-500'}>{build.exit_code}</td>
                    </tr>
                    <tr>
                        <th>Exit message</th>
                        <td className={build.exit_code === 0 ? 'text-green-500' : 'text-red-500'}>{build.exit_message !== null ? build.exit_message : 'No message available'}</td>
                    </tr>
                    <tr>
                        <th>Start At</th>
                        <td>{dateFormatter(build.created_at)}</td>
                    </tr>
                    <tr>
                        <th>Complete At</th>
                        <td>{dateFormatter(build.completed_at)}</td>
                    </tr>
                    <tr>
                        <th>Duration</th>
                        <td className="italic">{getMinutes()} minutes</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </>
    );
}
