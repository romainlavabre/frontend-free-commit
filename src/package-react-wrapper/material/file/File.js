import Box from "@mui/material/Box";
import {Button} from "@mui/material";
import {Download} from "@mui/icons-material";
import useDownload from "../../use/useDownload";

export default function File({base64, contentType, filename, css, removeFunction = null}) {
    const download = useDownload();

    if (contentType.includes("image/")) {
        return (
            <Box
                position="relative"
            >
                <Box
                    display="flex"
                    justifyContent="center"
                >
                    <img src={`data:${contentType};base64,${base64}`}
                         style={{maxWidth: "100%", maxHeight: "70%"}}/>
                </Box>
                <Box
                    position="absolute"
                    bottom={0}
                    width="100%"
                >
                    <Box width="100%">
                        <Box display="flex" justifyContent="center" width="100%">
                            <Button startIcon={<Download/>} onClick={() => download(base64, contentType, filename)}
                                    variant="contained">
                                Télécharger
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    return (
        <Box
            position="relative"
        >
            <Box
                display="flex"
                justifyContent="center"
            >
                <embed
                    height={700}
                    width="100%"
                    src={`data:${contentType};base64,${base64}`}
                    content={contentType}
                    name={filename}
                />
            </Box>

            <Box
                position="absolute"
                bottom={0}
                width="100%"
            >
                <Box width="100%">
                    <Box display="flex" justifyContent="center" width="100%">
                        <Button startIcon={<Download/>} onClick={() => download(base64, contentType, filename)}
                                variant="contained">
                            Télécharger
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
