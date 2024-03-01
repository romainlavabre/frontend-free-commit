import {useNavigate} from "react-router";
import {useRef} from "react";
import useApi from "../../../api/auto/useApi";

export default function Create() {
    const {create} = useApi();
    const navigation = useNavigate();
    const nameInput = useRef();
    const sshKeyInput = useRef();

    const submit = async () => {
        const payload = {
            credential: {
                name: nameInput.current.value,
                ssh_key: sshKeyInput.current.value
            }
        };

        await create("api-free-commit", "credentials", payload, "admin");
        navigation("/credential");
    }

    return (
        <>
            <div className="bg-light p-10 mt-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="input-group">
                        <label>Name</label>
                        <input
                            type="text" className="input-text w-full"
                            pattern="[A-Z0-9-_]+"
                            title="[A-Z0-9-_]+"
                            placeholder="CLIENT_SECRET"
                            ref={nameInput}
                        />
                    </div>

                    <div className="input-group">
                        <label>SSH key</label>
                        <textarea
                            rows="10"
                            className="input-text w-full"
                            placeholder="SSH key"
                            ref={sshKeyInput}
                        />
                    </div>
                </div>

                <div className="form-submit">
                    <button className="text-green-500" onClick={submit}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none"
                             viewBox="0 0 24 24"
                             stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
                        </svg>
                    </button>
                </div>
            </div>
        </>
    )
}
