import PropTypes from "prop-types";
import ReloadIcon from "../../util/icon/ReloadIcon";
import useApi from "../../../api/auto/useApi";

export default function ReloadSignatureKey({projectId}) {
    const {update} = useApi();

    const reloadSignatureKey = () => {
        update("api", "projects", projectId, "signature_key", null, "admin");
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
