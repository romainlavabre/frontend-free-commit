import {useDispatch} from "react-redux";
import {useForm} from "react-hook-form";
import api from "../../api/api";
import {updateOne} from "../../store/credential";
import {openAlert} from "../../store/util";
import mixin from "../../mixin/mixin";
import {useNavigate} from "react-router";

export default function Create() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        const payload = {
            credential: {
                name: data.name,
                ssh_key: data.sshKey
            }
        };

        try {
            const credential = await api.credential.create(payload);
            dispatch(updateOne(credential));
            dispatch(openAlert({
                type: 'success',
                title: 'Successfully created'
            }));
            navigate('/credential');
        } catch (e) {
            console.log(e)
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
                                placeholder="CLIENT_SECRET" {...register("name")}
                            />
                        </div>

                        <div className="input-group">
                            <label>SSH key</label>
                            <textarea
                                rows="10"
                                className="input-text w-full"
                                placeholder="SSH key" {...register("sshKey")}
                            />
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
