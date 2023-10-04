import {useDispatch} from "react-redux";
import {closeInfo, openInfo} from "../store/util";

export default function () {
    const dispatch = useDispatch();

    return {
        launch: async (title, content) => {
            dispatch(openInfo({
                title: title,
                description: content
            }));
        },
        close: () => {
            dispatch(closeInfo())
        }
    }
}
