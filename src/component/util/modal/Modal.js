import useEventDispatcher from "../../../use/useEventDispatcher";
import React, {useEffect, useRef, useState} from "react";
import event from "../../../event/event";
import ArrowLeftIcon from "../icon/ArrowLeftIcon";
import CloseIcon from "../icon/CloseIcon";

export default function () {
    const {subscribe, unsubscribe, launcher} = useEventDispatcher();
    const componentList = useRef([]);
    const [component, setComponent] = useState(null);

    const recipient = e => {
        setComponent(e.data.component);
        componentList.current.push(e.data.component);
    }

    const closeRecipient = e => {
        if (e.data.close) {
            close();
        }
    }

    useEffect(() => {
        subscribe(event.OPEN_MODAL, recipient);

        return () => unsubscribe(event.OPEN_MODAL, recipient);
    }, []);

    useEffect(() => {
        subscribe(event.CLOSE_MODAL, closeRecipient);

        return () => unsubscribe(event.CLOSE_MODAL, closeRecipient);
    }, []);

    useEffect(() => {
        if (component === null) {
            launcher(event.CLOSE_MODAL, {});
            document.querySelector("body").style.overflow = "auto";
            return;
        }

        document.querySelector("body").style.overflow = "hidden";
    }, [component]);

    const ignore = () => {
    }

    const close = () => {
        componentList.current = [];

        setComponent(null);
    }

    const back = () => {
        componentList.current.pop();

        if (componentList.current.length > 0) {
            setComponent(componentList.current[componentList.current.length - 1])
        } else {
            setComponent(null);
        }
    }

    if (component === null) {
        return null;
    }

    return (
        <div className="fixed z-50 w-full bg-default overflow-auto scroll-auto top-0 bottom-0 p-1 left-0 pb-5">
            <div className="flex justify-end absolute right-0 z-50">
                {
                    componentList.current.length > 1
                        ? (
                            <button type="button"
                                    className="button-yellow"
                                    onClick={back}>
                                <ArrowLeftIcon size={6}/>
                            </button>
                        )
                        : null
                }

                <button type="button"
                        className="button-red"
                        onClick={close}>
                    <CloseIcon size={6}/>
                </button>
            </div>
            {component}
        </div>
    );
}
