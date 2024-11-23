import useEventDispatcher from "./useEventDispatcher";

export default function () {
    const eventDispatcher = useEventDispatcher();

    const launch = (text, type = "success") => {
        eventDispatcher.launcher("ALTER", {
            text: text,
            type: type
        });
    };

    return {
        launch: launch,
        success: text => {
            launch(text);
        },
        error: text => {
            launch(text, "error");
        },
        warning: text => {
            launch(text, "warning");
        },
        info: text => {
            launch(text, "info");
        }
    }
}
