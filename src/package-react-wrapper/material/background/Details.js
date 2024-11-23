import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import isNull from "../../mixin/isNull";

export default function ({logs}) {
    if (isNull(logs)) {
        return (
            <Box>
                <Typography textAlign="center">Pas encore de log pour ce process</Typography>
            </Box>
        )
    }

    return (
        <Box height={500} overflow={"auto"} sx={{scrollbarWidth: "none"}}>
            {
                logs.map((log, i) => (
                    <Typography key={i} color={log.color}>
                        {log.content}
                    </Typography>
                ))
            }
        </Box>
    )
}