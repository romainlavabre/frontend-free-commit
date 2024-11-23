import {useEffect, useState} from "react";
import Box from "@mui/material/Box";
import isNull from "../../mixin/isNull";
import File from "./File";
import Typography from "@mui/material/Typography";
import {CircularProgress, Fab} from "@mui/material";
import {ArrowLeft, ArrowRight} from "@mui/icons-material";

export default function ({ids, getFile, startAtIndex = 0, onChange}) {
    const [data, setData] = useState(null);
    const [current, setCurrent] = useState(null);

    useEffect(() => {
        const res = {};

        ids.forEach(id => res[`${id}`] = {});

        setData(res);
    }, []);

    useEffect(() => {
        if (isNull(data) || data.length === 0 || !isNull(current) || ids.length === 0) return;

        fetch(Object.keys(data)[startAtIndex]);
    }, [data]);


    const next = () => {
        const keys = Object.keys(data);
        const currentIndex = keys.findIndex(d => d === current.file.getId());
        const nextIndex = currentIndex + 1 >= keys.length ? 0 : currentIndex + 1;

        fetch(keys[nextIndex]);
    }

    const prev = () => {
        const keys = Object.keys(data);

        if (isNull(current)) {

            fetch(keys[0]);
            return;
        }

        const currentIndex = keys.findIndex(d => d === current.file.getId());
        const nextIndex = currentIndex === 0 ? keys.length - 1 : currentIndex - 1;

        fetch(keys[nextIndex]);
    }

    const fetch = async id => {
        if (!isNull(onChange)) onChange(id);
        
        if (!isNull(data[id].file)) {
            setCurrent(data[id]);
            return;
        }

        const res = {...data};
        res[id].file = await getFile(id);
        res[id].file._setId(id);

        setCurrent(res[id]);

        setTimeout(() => setData(res), 150);
    }

    return (
        <Box position="relative">
            {
                ids.length > 1
                    ? (
                        <>
                            <Box position="absolute" top={0} left={0}>
                                <Fab color="secondary" onClick={prev}>
                                    <ArrowLeft/>
                                </Fab>
                            </Box>
                            <Box position="absolute" top={0} right={0}>
                                <Fab color="secondary" onClick={next}>
                                    <ArrowRight/>
                                </Fab>
                            </Box>
                        </>
                    )
                    : null
            }
            {
                !isNull(current)
                    ? (
                        <Box mx={5}>
                            <File
                                base64={current.file.getBase64()}
                                filename={current.file.getName()}
                                contentType={current.file.getContentType()}
                            />
                        </Box>
                    )
                    : (
                        <>
                            {
                                ids.length === 0
                                    ? <Typography textAlign="center">Aucun fichier disponible</Typography>
                                    : <Box display="flex" justifyContent="center"><CircularProgress/></Box>
                            }
                        </>
                    )
            }
        </Box>
    );
}