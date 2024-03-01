import {useEffect, useRef, useState} from "react";

export default function ({at}) {
    const interval = useRef();
    const [seconds, setSeconds] = useState("00:00");

    useEffect(() => {
        interval.current = setInterval(() => {
            const time = new Date(new Date() - new Date(at)).toTimeString();

            setSeconds((time.split(":")[1] + ":" + time.split(":")[2]).split(" ")[0]);
        }, 1000);

        return () => clearInterval(interval.current);
    }, []);

    return seconds;
}