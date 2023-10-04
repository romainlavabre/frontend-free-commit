import {useDispatch} from "react-redux";
import {openAlert} from "../store/util";

export default function () {
    const dispatch = useDispatch();

    return {
        launch: (text, type = "success") => {
            dispatch(openAlert({
                title: text,
                type: type
            }));
        }
    }
}
