import PropTypes from "prop-types";
import {useDispatch, useSelector} from "react-redux";
import React from "react";
import {openAlert, openConfirm} from "../../store/util";
import {remove} from "../../store/secret";
import mapErrorMessage from "../../mixin/mapErrorMessage";
import {useNavigate} from "react-router";
import TrashIcon from "../util/icon/TrashIcon";
import api from "../../api/api";

export default function Delete({id}) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const project = useSelector(state => state.project.projects.find(project => project.id == id));

    const confirmDeletion = () => {
        dispatch(openConfirm({
            title: "You will delete this project",
            callback: [
                async (isDelete) => {
                    if (!isDelete) return;

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

        <button
            className="badge-red-square ml-5"
            onClick={() => confirmDeletion()}>
            <TrashIcon size={8}/>
        </button>
    );
}

Delete.prototype = {
    id: PropTypes.number.isRequired
}
