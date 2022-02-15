import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import api from "../../api/api";
import {updateOne} from "../../store/project";
import {openAlert} from "../../store/util";
import mapErrorMessage from "../../mixin/mapErrorMessage";

export default function ReloadSignatureKey({projectId}) {
    const dispatch = useDispatch();

    const reloadSignatureKey = async () => {
        try {
            await api.project.update(projectId, "signature_key", null);
            dispatch(openAlert({
                type: 'success',
                title: 'Successfully reloaded'
            }));

            const project = await api.project.findById(projectId);
            dispatch(updateOne(project));
        } catch (e) {
            dispatch(openAlert({
                type: 'error',
                title: mapErrorMessage(e)
            }));
        }
    }

    return (
        <button className="text-orange-500 hover:text-orange-600" onClick={() => reloadSignatureKey()}>
            <svg xmlns="http://www.w3.org/2000/svg"
                 className="h-8 w-8" fill="none"
                 viewBox="0 0 24 24"
                 stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
        </button>
    )
}


ReloadSignatureKey.prototype = {
    projectId: PropTypes.number.isRequired
}
