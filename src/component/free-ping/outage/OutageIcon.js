import ExclamationTriangleIcon from "../../util/icon/ExclamationTriangleIcon";
import {useEffect, useState} from "react";
import api from "../../../api/api";

export default function () {
    const [count, setCount] = useState(0);

    useEffect(async () => {
        setCount((await api.freeping.pagination.countOpenedIncident()));
    }, []);

    if (count > 0) {
        return (
            <div
                className="text-orange-600 animate-pulse">
                <ExclamationTriangleIcon size={5}/>
            </div>
        )
    }

    return <ExclamationTriangleIcon size={5}/>;
}