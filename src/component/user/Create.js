import {useForm} from "react-hook-form";
import api from "../../api/api";
import {useDispatch} from "react-redux";
import {updateOne} from "../../store/user";
import {openAlert} from "../../store/util";
import mixin from "../../mixin/mixin";
import {useNavigate} from "react-router";

export default function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        const payload = {
            developer: data
        };

        try {
            const developer = await api.user.create(payload);
            dispatch(updateOne(developer));
            dispatch(openAlert({
                type: 'success',
                title: 'Successfully created'
            }));
            navigate(`/user`);
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
                            <label>Username</label>
                            <input type="text" className="input-text w-full"
                                   placeholder="Username" {...register("username")}/>
                        </div>

                        <div className="input-group">
                            <label>Email</label>
                            <input type="email" className="input-text w-full"
                                   placeholder="Email" {...register("email")}/>
                        </div>

                        <div className="input-group">
                            <label>Password</label>
                            <input type="password" className="input-text w-full"
                                   placeholder="Password" {...register("password")}/>
                        </div>

                        <div className="input-group">
                            <label>Github Username</label>
                            <input type="text" className="input-text w-full"
                                   placeholder="Github Username" {...register("github_username")}/>
                        </div>

                        <div className="input-group">
                            <label>Granted</label>
                            <select type="text" className="input-select w-full"
                                    multiple
                                    placeholder="Granted" {...register("roles")}>
                                <option value="ROLE_ADMIN">ADMIN</option>
                                <option value="ROLE_DEVELOPER">DEVELOPER</option>
                            </select>
                        </div>

                        <div className="input-group">
                            <label>Gitlab Username</label>
                            <input type="text" className="input-text w-full"
                                   placeholder="Gitlab Username" {...register("gitlab_username")}/>
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
    );
}
