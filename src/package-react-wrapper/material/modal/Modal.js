import {useState} from "react";
import {Fab, Modal} from "@mui/material";
import Box from "@mui/material/Box";
import {Close} from "@mui/icons-material";

/**
 *
 * @param ModalConfig modalConfig
 * @return {JSX.Element}
 */
export default function ({modalConfig}) {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        modalConfig.executeOnClose();
        setOpen(false);
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: modalConfig.getWidth(),
                height: modalConfig.getHeight(),
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 4,
                overflow: 'auto',
            }}>
                <Box position="fixed" top={10} right={10}>
                    <Fab size={"small"} color="secondary" onClick={handleClose}>
                        <Close/>
                    </Fab>
                </Box>
                {modalConfig.getComponent()}
            </Box>
        </Modal>
    )
}