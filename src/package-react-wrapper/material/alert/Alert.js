import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import {Alert} from "@mui/material";
import useEventDispatcher from "../../use/useEventDispatcher";
import isNull from "../../mixin/isNull";

export default function () {
    const eventDispatcher = useEventDispatcher();
    const [alert, setAlert] = useState(null);

    const handleEvent = e => {
        switch (e.data.type) {
            case "success":
                setAlert((
                    <Alert variant={"filled"} severity="success">
                        {e.data.text}
                    </Alert>
                ));
                break;
            case "error":
                setAlert((
                    <Alert variant={"filled"} severity="error">
                        {e.data.text}
                    </Alert>
                ));
                break;
            case "warning":
                setAlert((
                    <Alert variant={"filled"} severity="warning">
                        {e.data.text}
                    </Alert>
                ));
                break;
            case "info":
                setAlert((
                    <Alert variant={"filled"} severity="info">
                        {e.data.text}
                    </Alert>
                ));
                break;
        }

        setTimeout(() => {
            setAlert(null)
        }, 5000);
    }

    useEffect(() => {
        eventDispatcher.subscribe("ALTER", handleEvent);
    }, []);

    if (!isNull(alert)) {
        return (
            <Box
                position="fixed"
                top={5}
                right={5}
                zIndex={99999999}
                onClick={() => setAlert(null)}
            >
                {alert}
            </Box>
        );
    }

    return null;
}
