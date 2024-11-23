import {IconButton, Tooltip} from "@mui/material";
import {Mic, MicOff} from "@mui/icons-material";
import {useEffect, useState} from "react";
import isNull from "../../mixin/isNull";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = !isNull(SpeechRecognition) ? new SpeechRecognition() : null;

export default function ({onContentReady}) {
    const [listen, setListen] = useState(false);
    const [open, setOpen] = useState(true);

    const handleTooltipClose = () => {
        setOpen(false);
    };


    useEffect(() => {
        setTimeout(() => {
            handleTooltipClose();
        }, 2000);

        return () => recognition?.stop();
    }, []);

    const speechToText = () => {
        setListen(true);

        recognition.lang = "fr-FR";
        recognition.continuous = true;
        recognition.interimResults = true;

        recognition.onspeechend = () => {
            console.log("stopped listening");
            recognition.stop();
        }
        recognition.onresult = (result) => {
            let res = "";

            Object.values(result.results).forEach(r => {
                res += r[0].transcript;
            });

            onContentReady(res);
        }

        recognition.onerror = (event) => {
            console.log(`Speech recognition error detected: ${event.error}`);
            setListen(false);
        };

        recognition.start();
    }

    const stop = () => {
        recognition.stop();
        setListen(false);
    }

    if (isNull(recognition)) return null;

    if (listen) {
        return (
            <Tooltip title={"J'ai fini de dicter mon message"}>
                <IconButton onClick={stop}>
                    <Mic/>
                </IconButton>
            </Tooltip>
        )
    }

    return (
        <>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={handleTooltipClose}
                open={open}
                title={"Dictez votre message en cliquant sur le micro"}
            >
                <IconButton onClick={speechToText}>
                    <MicOff/>
                </IconButton>
            </Tooltip>
        </>
    )
}