import {useEffect, useRef} from "react";
import {ZonedDateTime, ZoneOffset} from "@js-joda/core";
import axios from "axios";
import database from "../database/database";

export default function () {
    const interval = useRef();
    const dateTime = useRef(ZonedDateTime.now(ZoneOffset.UTC));

    useEffect(() => {
        interval.current = setInterval(async () => {
            await send(dateTime.current.withFixedOffsetZone().toString());
        }, 60000);

        document.addEventListener("mousemove", e => {
            dateTime.current = ZonedDateTime.now(ZoneOffset.UTC);
        });

        document.addEventListener("keydown", e => {
            dateTime.current = ZonedDateTime.now(ZoneOffset.UTC);
        });

        return () => clearInterval(interval.current);
    }, []);

    const send = async dateTime => {
        try {
            await axios.post(process.env.REACT_APP_API_URL + `/service-time-clock/admin/last_activities/detected`, {
                last_activity: {
                    at: dateTime
                }
            }, {
                headers: {
                    Authorization: `Bearer ${database.read("authentication", "access_token")}`
                }
            });

            return true;
        } catch (e) {
            return false;
        }
    }

    return null;

}