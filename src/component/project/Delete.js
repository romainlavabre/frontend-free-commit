import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {openAlert, openConfirm} from "../../store/util";
import {remove} from "../../store/secret";
import api from "../../api/api";
import mapErrorMessage from "../../mixin/mapErrorMessage";
import {useNavigate} from "react-router";

export default function Delete({id}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const project = useSelector(state => state.project.projects.find(project => project.id == id));

    const confirmDeletion = () => {
        dispatch(openConfirm({
            title: "You will delete this project",
            callback: [
                async (isDelete) => {
                    if (!isDelete) {
                        return;
                    }

                    try {
                        await api.project.delete(id);

                        dispatch(openAlert({
                            type: 'success',
                            title: 'Project deleted'
                        }));

                        navigate('/project');
                        dispatch(remove(project));
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
                Delete project
            </button>
        </div>
    );
}

Delete.prototype = {
    id: PropTypes.number.isRequired
}
