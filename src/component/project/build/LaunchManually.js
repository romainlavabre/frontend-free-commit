import PropTypes from "prop-types";
import api from "../../../api/api";
import {useDispatch} from "react-redux";
import {openAlert} from "../../../store/util";
import mapErrorMessage from "../../../mixin/mapErrorMessage";

export default function LaunchManually({projectId}) {
    const dispatch = useDispatch();

    const onClick = async e => {
        e.stopPropagation();

        try {
            await api.build.launch(projectId);
            dispatch(openAlert({
                type: 'success',
                title: 'Build launched'
            }));
        } catch (e) {
            dispatch(openAlert({
                type: 'error',
                title: mapErrorMessage(e)
            }));
        }
    }
    return (
        <>
            <button className="text-green-500 hover:text-green-600" onClick={e => onClick(e)}>
                <svg xmlns="http://www.w3.org/2000/svg"
                     className="h-8 w-8" fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                </svg>
            </button>
        </>
    );
}

LaunchManually.prototype = {
    projectId: PropTypes.number.isRequired
}
