import {openConfirm} from "../store/util";
import {useDispatch} from "react-redux";

export default function () {
    const dispatch = useDispatch();

    return {
        launch: (text, callbackOnSet) => {
            dispatch(openConfirm({
                title: "Confirmation",
                description: text,
                callback: [callbackOnSet]
            }));
        }
    }
}
