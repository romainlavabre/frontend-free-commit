import React from "react";
import {useDispatch} from "react-redux";
import {openAlert} from "../../store/util";
import api from "../../api/api";
import database from "../../database/database";
import mixin from "../../mixin/mixin";
import {useNavigate} from "react-router";
import {useForm} from "react-hook-form";
import logo from "../../assets/img/logo/logo_transparent.png";

export default function Authenticate() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {register, handleSubmit, formState: {errors}} = useForm();

    const onSubmit = async (form) => {
        const response = await api.authentication.authenticate(form.username, form.password);

        if (response === null) {
            dispatch(openAlert({
                title: 'Identifiants incorrect',
                type: 'error'
            }));
            return;
        }

        const decodedToken = mixin.decodeAccessToken(response.access_token);

        database.write(database.TABLE_AUTHENTICATION, 'access_token', response.access_token);
        database.write(database.TABLE_AUTHENTICATION, 'roles', decodedToken.roles);

        navigate('/project')
    }

    return (
        <>
            <div className="flex justify-center">
                <div className="mt-20 w-100  shadow-fairfair p-5 text-center text-xl bg-gray-700/20">
                    <div className="flex justify-center">
                        <img src={logo} className="w-56"/>
                    </div>
                    <h4 className={'font-bold p-5 text-fairfair my-5'}>Authentification</h4>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="input-group">
                            <span
                                className="input-error">{errors['username'] ? errors['username'].message : null}</span>

                            <input type="text" placeholder="Nom d'utilisateur"
                                   className="input-text" {...register("username", {required: "Nom d'utilisateur requis"})}/>
                        </div>

                        <div className="input-group">
                            <span
                                className="input-error">{errors['password'] ? errors['password'].message : null}</span>
                            <input type="password" placeholder="Mot de passe"
                                   className="input-text" {...register("password", {required: 'Mot de passe requis'})}/>
                        </div>
                        <button className="bg-fairfair p-2 rounded-md w-full mt-2" type="submit">
                            Connexion
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
