import {useParams} from "react-router";
import CopyIcon from "../../util/icon/CopyIcon";
import ReloadSignatureKey from "./ReloadSignatureKey";
import React from "react";
import useClipboard from "../../../use/useClipboard";
import useAlert from "../../../use/useAlert";
import {useSelector} from "react-redux";
import isNull from "../../../mixin/global/isNull";

export default function () {
    const clipboard = useClipboard();
    const alert = useAlert();
    const {id} = useParams();
    const project = useSelector(state => state.api?.["api-free-commit"]?.projects?.values[id]);

    if (isNull(project)) return null;

    return (
        <>
            <h4 className="text-2xl mt-5">Webhook</h4>
            <table className="table table-auto">
                <tbody>
                <tr>
                    <th className="flex justify-center border-none">
                        Webhook Secret key
                    </th>
                    <td>
                        <div className="flex justify-center items-center my-auto">
                            {project.signature_key}
                            <button className="badge-blue-square mx-5"
                                    onClick={() => {
                                        clipboard(project.signature_key);
                                        alert.launch("Copied !");
                                    }}
                            >
                                <CopyIcon size={5}/>
                            </button>
                            <ReloadSignatureKey projectId={id}/>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th>Webhook URL</th>
                    <td>
                        <div className="flex justify-center">
                            https://{window.location.host}/api/guest/webhooks/build/{id}
                            <button className="badge-blue-square mx-5"
                                    onClick={() => {
                                        clipboard(`https://${window.location.host}/api/guest/webhooks/build/${id}`);
                                        alert.launch("Copied !");
                                    }}
                            >
                                <CopyIcon size={5}/>
                            </button>
                        </div>
                    </td>
                </tr>
                <tr>
                    <th className="flex justify-center text-red-500 border-none">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                        </svg>
                        Webhook Accept
                    </th>
                    <td>
                        <span className="text-orange-400">
                            application/json
                        </span>
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}