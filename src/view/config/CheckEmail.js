import React from "react";
import useInitStore from "../../store/useInitStore";
import {useForm} from "react-hook-form";
import api from "../../api/api";
import {useDispatch} from "react-redux";
import {openAlert} from "../../store/util";
import useAxiosConfig from "../../use/useAxiosConfig";

export default function CheckEmail() {
    const {register, handleSubmit} = useForm();
    const dispatch = useDispatch();
    useAxiosConfig();
    useInitStore();

    const submit = data => {
        api.config.checkEmail(data.recipient);

        dispatch(openAlert({
            type: 'success',
            title: 'Check your email'
        }));
    }

    return (
        <>
            <div className="flex flex-row">
                <div className="w-full m-3">
                    <div className="bg-light p-10 mt-4">
                        <h4 className="text-center text-fairfair text-3xl my-5">Check mail</h4>

                        <form onSubmit={handleSubmit(submit)}>
                            <div className="input-group">
                                <label>Recipient</label>
                                <input className="input-text" {...register("recipient")} placeholder="Recipient"/>
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
                </div>
            </div>
        </>
    );
}
