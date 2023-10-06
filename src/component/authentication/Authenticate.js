import React, {useRef} from "react";
import api from "../../api/api";
import database from "../../database/database";
import mixin from "../../mixin/mixin";
import {useNavigate} from "react-router";
import logo from "../../assets/img/logo/logo-light.png";
import useAlert from "../../use/useAlert";

export default function Authenticate() {
    const alert = useAlert();
    const navigate = useNavigate();
    const usernameInput = useRef();
    const passwordInput = useRef();

    const submit = async () => {
        const response = await api.authentication.authenticate(usernameInput.current.value, passwordInput.current.value);

        if (response === null) {
            alert.launch("Identifiants incorrect", "error");
            return;
        }

        const decodedToken = mixin.decodeAccessToken(response.access_token);

        database.write(database.TABLE_AUTHENTICATION, 'access_token', response.access_token);
        database.write(database.TABLE_AUTHENTICATION, 'roles', decodedToken.roles);

        navigate('/project');
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="mt-20 w-100  shadow-fairfair p-5 text-center text-xl bg-gray-700/20">
                    <div className="flex justify-center">
                        <img src={logo} className="w-56"/>
                    </div>
                    <h4 className={'font-bold p-5 text-fairfair my-5'}>Authentication</h4>

                    <div className="input-group">
                        <input
                            type="text"
                            placeholder="Nom d'utilisateur"
                            className="input-text"
                            ref={usernameInput}
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="password"
                            placeholder="Mot de passe"
                            className="input-text"
                            ref={passwordInput}
                        />
                    </div>
                    <button className="p-2 rounded-md w-full mt-2 hover:bg-gray-700" onClick={submit}>
                        Connect
                    </button>
                </div>
            </div>
        </>
    );
}
