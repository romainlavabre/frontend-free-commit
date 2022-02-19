import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {openAlert, openConfirm} from "../../store/util";
import {remove} from "../../store/credential";
import api from "../../api/api";
import mapErrorMessage from "../../mixin/mapErrorMessage";
import {useNavigate} from "react-router";

export default function Delete({id}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const credential = useSelector(state => state.credential.credentials.find(credential => credential.id == id));

    const confirmDeletion = () => {
        dispatch(openConfirm({
            title: "You will delete this credential",
            callback: [
                async (isDelete) => {
                    if (!isDelete) {
                        return;
                    }

                    try {
                        await api.credential.delete(id);

                        dispatch(openAlert({
                            type: 'success',
                            title: 'Credential deleted'
                        }));

                        navigate('/credential');
                        dispatch(remove(credential));
                    } catch (e) {
                        dispatch(openAlert({
                            type: 'error',
                            title: mapErrorMessage(e)
                        }));
                    }
                }
            ]
        }))
    }

    return (
        <div className="bg-light p-10 mt-4">
            <h4 className="text-red-500 font-bold text-center text-3xl">Danger Zone</h4>

            <button
                className="bg-red-600 p-2 rounded"
                onClick={() => confirmDeletion()}>
                Delete credential
            </button>
        </div>
    );
}

Delete.prototype = {
    id: PropTypes.number.isRequired
}
