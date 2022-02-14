import {useDispatch, useSelector} from "react-redux";
import {useForm} from "react-hook-form";
import api from "../../api/api";
import {updateOne} from "../../store/user";
import {openAlert} from "../../store/util";
import mixin from "../../mixin/mixin";
import {useNavigate} from "react-router";

export default function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const projects = useSelector(state => state.project.projects);
    const {register, handleSubmit} = useForm();

    const onSubmit = async data => {
        const payload = {
            secret: {
                name: data.name,
                value: data.value,
                project_id: data.projectId
            }
        };

        try {
            const developer = await api.secret.create(payload);
            dispatch(updateOne(developer));
            dispatch(openAlert({
                type: 'success',
                title: 'Successfully created'
            }));
            navigate('/secret');
        } catch (e) {
            dispatch(openAlert({
                type: 'error',
                title: mixin.mapErrorMessage(e)
            }));
        }
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="input-group">
                            <label>Name</label>
                            <input
                                type="text" className="input-text w-full"
                                pattern="[A-Z0-9-_]+"
                                title="[A-Z0-9-_]+"
                                placeholder="CLIENT_SECRET"
                                {...register("name")}
                            />
                        </div>

                        <div className="input-group">
                            <label>Value</label>
                            <textarea
                                className="input-text w-full"
                                placeholder="Secret value"
                                {...register("value")}
                            />
                        </div>

                        <div className="input-group">
                            <label>
                                Scope (
                                <span className="text-sm italic">
                                    If you let this field empty, the default scope is global
                                </span>
                                )
                            </label>
                            <select
                                className="input-select w-full"
                                {...register("projectId")}
                            >
                                <option value="">GLOBAL</option>
                                {
                                    projects.map(project => (
                                        <option key={project.id} value={project.id}>{project.name}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>

                    <div className="form-submit">
                        <button type="submit" className="text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                                 viewBox="0 0 24 24"
                                 stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
