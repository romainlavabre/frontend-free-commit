import {useEffect, useState} from "react";
import api from "../../../api/api";
import isNull from "../../../mixin/global/isNull";

export default function () {
    const [envs, setEnvs] = useState(null);

    useEffect(async () => {
        setEnvs((await api.config.getEnv()));
    }, []);

    if (isNull(envs)) return null;

    return (
        <div>
            <h1>Environment variable</h1>
            <table>
                <thead>
                <tr>
                    <th>Env</th>
                    <th>Value</th>
                </tr>
                </thead>
                <tbody>
                {
                    Object.keys(envs).map(key => (
                        <tr key={key}>
                            <td>{key}</td>
                            <td>{envs[key]}</td>
                        </tr>
                    ))
                }
                </tbody>
            </table>
        </div>
    )
}