import PropTypes from "prop-types";
import {useDispatch} from "react-redux";
import api from "../../api/api";
import {updateOne} from "../../store/project";
import {openAlert} from "../../store/util";
import mapErrorMessage from "../../mixin/mapErrorMessage";
import ReloadIcon from "../util/icon/ReloadIcon";

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
            <ReloadIcon/>
        </button>
    )
}


ReloadSignatureKey.prototype = {
    projectId: PropTypes.number.isRequired
}
