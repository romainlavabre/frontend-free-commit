import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import React from "react";
import {openConfirm} from "../../../store/util";
import TrashIcon from "../../util/icon/TrashIcon";
import useApi from "../../../api/auto/useApi";

export default function Delete({id}) {
    const dispatch = useDispatch();
    const {remove} = useApi();

    const confirmDeletion = () => {
        dispatch(openConfirm({
            title: "You will delete this project",
            callback: [
                async (isDelete) => {
                    if (!isDelete) return;

                    remove("api-free-commit", "projects", id, "admin");
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
