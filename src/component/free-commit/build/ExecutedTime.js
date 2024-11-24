import {useEffect, useRef, useState} from "react";
import isNull from "../../../package-react-wrapper/mixin/isNull";

export default function ({at, lock}) {
    const interval = useRef();
    const [seconds, setSeconds] = useState("00:00");

    useEffect(() => {
        if (!isNull(lock)) {
            const time = new Date(new Date(lock) - new Date(at)).toTimeString();

            setSeconds((time.split(":")[1] + ":" + time.split(":")[2]).split(" ")[0]);
            return;
        }

        interval.current = setInterval(() => {
            const time = new Date(new Date() - new Date(at)).toTimeString();

            setSeconds((time.split(":")[1] + ":" + time.split(":")[2]).split(" ")[0]);
        }, 1000);

        return () => clearInterval(interval.current);
    }, []);

    return seconds;
}