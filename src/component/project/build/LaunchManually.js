import PropTypes from "prop-types";
import api from "../../../api/api";
import mapErrorMessage from "../../../mixin/mapErrorMessage";
import ReloadIcon from "../../util/icon/ReloadIcon";
import useAlert from "../../../use/useAlert";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useApi from "../../../api/auto/useApi";
import ArrowRightIcon from "../../util/icon/ArrowRightIcon";
import isNull from "../../../mixin/global/isNull";

export default function LaunchManually({projectId}) {
    const alert = useAlert();
    const {findOneBy} = useApi();
    const [open, setOpen] = useState(false);
    const project = useSelector(state => state.api?.["api-free-commit"]?.projects?.values[projectId]);

    useEffect(() => {
        findOneBy("api-free-commit", "projects", "id", projectId, "developer");
    }, []);

    const launch = async () => {
        const ignoreSteps = [];

        if (!isNull(project.available_steps)) {
            project.available_steps.forEach(step => {
                const element = document.getElementById(`input-${step}`);
                if (!element.checked) {
                    ignoreSteps.push(step);
                }
            })
        }

        try {
            await api.build.launch(projectId, ignoreSteps);
            alert.launch("Build launched");
            setOpen(false);
        } catch (e) {
            alert.launch(mapErrorMessage(e), "error");
        }
    }
    return (
        <>
            <button className="text-green-500 hover:text-green-600" onClick={e => {
                e.stopPropagation();
                setOpen(true)
            }}>
                <ReloadIcon size={8}/>
            </button>

            {
                open
                    ? (
                        <div className="fixed bg-default min-h-20 w-2/12 top-5 left-[80%] p-2 border-2 border-gray-800"
                             onClick={e => e.stopPropagation()}>
                            <div className="flex justify-between">
                                <div className="underline">
                                    Steps
                                </div>
                                <div>
                                    <button className="badge-green-square" onClick={launch}>
                                        <ArrowRightIcon size={6}/>
                                    </button>
                                </div>
                            </div>

                            <div>
                                {
                                    project.available_steps.map(step => (
                                        <div key={step}>
                                            <label htmlFor={`input-${step}`}>{step}</label>
                                            <input id={`input-${step}`} type="checkbox" className="input-checkbox"
                                                   defaultChecked={true}/>
                                        </div>
                                    ))
                                }

                                {
                                    isNull(project.available_steps) || project.available_steps.length === 0
                                        ? (
                                            <div>
                                                Step not resolved
                                            </div>
                                        )
                                        : null
                                }
                            </div>
                        </div>
                    )
                    : null
            }
        </>

    );
}

LaunchManually.prototype = {
    projectId: PropTypes.number.isRequired
}
