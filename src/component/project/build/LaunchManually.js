import PropTypes from "prop-types";
import api from "../../../api/api";
import mapErrorMessage from "../../../mixin/mapErrorMessage";
import ReloadIcon from "../../util/icon/ReloadIcon";
import useAlert from "../../../use/useAlert";

export default function LaunchManually({projectId}) {
    const alert = useAlert();

    const onClick = async e => {
        e.stopPropagation();

        try {
            await api.build.launch(projectId);
            alert.launch("Build launched");
        } catch (e) {
            alert.launch(mapErrorMessage(e), "error");
        }
    }
    return (
        <button className="text-green-500 hover:text-green-600" onClick={e => onClick(e)}>
            <ReloadIcon size={8}/>
        </button>
    );
}

LaunchManually.prototype = {
    projectId: PropTypes.number.isRequired
}
