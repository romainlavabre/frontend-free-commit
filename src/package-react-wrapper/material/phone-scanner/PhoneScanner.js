import {IconButton, Tooltip} from "@mui/material";
import {QrCode} from "@mui/icons-material";
import {useState} from "react";
import Modal from "../modal/Modal";
import ModalConfig from "../modal/ModalConfig";
import QRCode from "react-qr-code";

export default function ({phone, disabled}) {
    const [open, setOpen] = useState(false);

    const toggleOpen = o => () => setOpen(o);

    return (
        <>
            <Tooltip title={"Scanner le téléphone"}>
                <IconButton onClick={toggleOpen(true)} disabled={disabled}>
                    <QrCode/>
                </IconButton>
            </Tooltip>

            {
                open
                    ? (
                        <Modal
                            modalConfig={
                                new ModalConfig()
                                    .setOnClose(toggleOpen(false))
                                    .setHeight("40%")
                                    .setWidth("20%")
                                    .setComponent(<QRCode value={"tel:" + phone}/>)
                            }
                        />
                    )
                    : null
            }
        </>
    )
}