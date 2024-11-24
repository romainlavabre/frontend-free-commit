import {TextField} from "@mui/material";
import Box from "@mui/material/Box";
import api from "../../../api/api";
import useAlert from "../../../package-react-wrapper/use/useAlert";

export default function () {
    const alert = useAlert();


    const handleKeyDown = e => {
        if (e.key !== "Enter") return;

        api.config.checkEmail(e.target.value);

        alert.launch("Mail sent");
    }

    return (
        <Box>
            <TextField
                label={"Test email"}
                fullWidth
                variant="standard"
                onKeyDown={handleKeyDown}
            />
        </Box>
    )
}