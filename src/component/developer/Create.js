import useApi from "../../api/auto/useApi";
import {useNavigate} from "react-router";
import React, {useRef} from "react";
import BackIcon from "../util/icon/BackIcon";

export default function Create() {
    const {create} = useApi();
    const navigate = useNavigate();
    const emailInput = useRef();
    const usernameInput = useRef();
    const passwordInput = useRef();
    const githubUsernameInput = useRef();
    const gitlabUsername = useRef();
    const roleInput = useRef();

    const submit = async () => {
        const payload = {
            developer: {
                username: usernameInput.current.value,
                password: passwordInput.current.value,
                github_username: githubUsernameInput.current.value,
                gitlab_username: gitlabUsername.current.value,
                role: roleInput.current.value
            }
        };

        await create("api", "developers", payload, "admin");
        navigate("/developer");
    }

    return (
        <>
            <div className="flex justify-between">
                <div>
                    New developer
                </div>
                <div>
                    <button className="badge-blue-square" onClick={() => navigate('/developer')}>
                        <BackIcon size={8}/>
                    </button>
                </div>
            </div>
            <hr className="w-8/12 mx-auto my-5"/>
            <div className="grid grid-cols-2 gap-4">
                <div className="input-group">
                    <label>Username</label>
                    <input
                        type="text"
                        className="input-text w-full"
                        placeholder="Username"
                        ref={usernameInput}
                    />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        className="input-text w-full"
                        placeholder="Email"
                        ref={emailInput}
                    />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        className="input-text w-full"
                        placeholder="Password"
                        ref={passwordInput}
                    />
                </div>

                <div className="input-group">
                    <label>Github Username</label>
                    <input
                        type="text"
                        className="input-text w-full"
                        placeholder="Github Username"
                        ref={githubUsernameInput}
                    />
                </div>

                <div className="input-group">
                    <label>Granted</label>
                    <select
                        className="input-select w-full"
                        placeholder="Granted"
                        ref={roleInput}
                    >
                        <option value="ROLE_ADMIN">ADMIN</option>
                        <option selected={true} value="ROLE_DEVELOPER">DEVELOPER</option>
                    </select>
                </div>

                <div className="input-group">
                    <label>Gitlab Username</label>
                    <input
                        type="text"
                        className="input-text w-full"
                        placeholder="Gitlab Username"
                        ref={gitlabUsername}
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
        </>
    );
}
