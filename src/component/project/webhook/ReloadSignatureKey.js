import PropTypes from "prop-types";
import ReloadIcon from "../../util/icon/ReloadIcon";
import useApi from "../../../api/auto/useApi";
import useConfirm from "../../../use/useConfirm";

export default function ReloadSignatureKey({projectId}) {
    const {update} = useApi();
    const confirm = useConfirm();

    const reloadSignatureKey = confirm => {
        if (!confirm) {
            return;
        }

        update("api-free-commit", "projects", projectId, "signature_key", null, "admin");
    }

    return (
        <button className="text-orange-500 hover:text-orange-600"
                onClick={() => confirm.launch("You will reload signature key", reloadSignatureKey)}>
            <ReloadIcon/>
        </button>
    )
}


ReloadSignatureKey.prototype = {
    projectId: PropTypes.number.isRequired
}
