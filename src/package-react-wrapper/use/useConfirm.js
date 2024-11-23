import React, {useEffect, useState} from "react";
import Modal from "../material/modal/Modal";
import ModalConfig from "../material/modal/ModalConfig";
import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {Check, Close} from "@mui/icons-material";
import Typography from "@mui/material/Typography";

export default function () {
    const [show, setShow] = useState(false);
    const [modal, setModal] = useState(null);

    useEffect(() => {
        if (!show) {
            setModal(null);
        }
    }, [show]);

    return {
        managedConfirm: (title, subTitle, onConfirm) => {
            setShow(true);
            setModal(
                <Modal
                    modalConfig={
                        new ModalConfig()
                            .setOnClose(() => setShow(false))
                            .setComponent((
                                <Box>
                                    <Box>
                                        <Typography fontWeight={"bold"} fontSize={"large"}>
                                            {title}
                                        </Typography>
                                        <Typography variant="body2">
                                            {subTitle}
                                        </Typography>
                                    </Box>

                                    <Box
                                        mt={5}
                                        display="flex"
                                        justifyContent="end"
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Button
                                                variant={"contained"}
                                                startIcon={<Close/>}
                                                color={"success"}
                                                onClick={() => setShow(false)}
                                            >
                                                Annuler
                                            </Button>
                                        </Box>
                                        <Box
                                            ml={3}
                                        >
                                            <Button
                                                variant={"contained"}
                                                startIcon={<Check/>}
                                                color={"error"}
                                                onClick={() => {
                                                    setShow(false);
                                                    onConfirm();
                                                }}
                                            >
                                                Continuer
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                    }
                />
            )
        },
        freeConfirm: (content, onConfirm) => {
            setShow(true);
            setModal(
                <Modal
                    modalConfig={
                        new ModalConfig()
                            .setOnClose(() => setShow(false))
                            .setComponent((
                                <Box>
                                    {content}

                                    <Box
                                        mt={5}
                                        display="flex"
                                        justifyContent="end"
                                        alignItems="center"
                                    >
                                        <Box>
                                            <Button
                                                variant={"contained"}
                                                startIcon={<Close/>}
                                                color={"success"}
                                                onClick={() => setShow(false)}
                                            >
                                                Annuler
                                            </Button>
                                        </Box>
                                        <Box
                                            ml={3}
                                        >
                                            <Button
                                                variant={"contained"}
                                                startIcon={<Check/>}
                                                color={"error"}
                                                onClick={() => {
                                                    setShow(false);
                                                    onConfirm();
                                                }}
                                            >
                                                Continuer
                                            </Button>
                                        </Box>
                                    </Box>
                                </Box>
                            ))
                    }
                />
            )
        },
        confirmModal: modal
    }
}