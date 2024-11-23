import axios from "axios";
import database from "../../database/database";
import {useEffect} from "react";
import {blue, red} from "@mui/material/colors";
import isNull from "../../mixin/isNull";

export default function ({onTerminate, onNewLog, params, uri, paginationConfig}) {
    useEffect(() => {
        handle();
    }, []);

    const handle = async () => {
        let payload = null;
        let page = 0;
        const headers = paginationConfig.getPaginationColumns().map(pc => pc.getField());

        const rows = [
            paginationConfig.getPaginationColumns().map(pc => '"' + pc.getHeader() + '"').join(",")
        ];


        while (payload === null || payload.current_page < payload.last_page) {
            onNewLog({
                color: blue[500],
                content: `Récupération de la page ${page + 1}`
            });

            payload = (await fetch(getParams(++page))).data;

            payload.data.forEach(serverRow => {
                const row = [];

                headers.forEach(h => {
                    row.push(`"${isNull(serverRow[h]) ? "" : serverRow[h].toString().replaceAll('"', '\"')}"`);
                });

                rows.push(row.join(","));
            });

            await sleep(2000);
        }

        onNewLog({
            color: blue[500],
            content: `Construction des données ...`
        });

        const fileContent = rows.join(",\r\n");

        await sleep(300);

        onNewLog({
            color: blue[500],
            content: `Téléchargement du fichier sur la machine ...`
        });

        await sleep(150);

        const anchor = document.createElement('a');
        anchor.href = `data:text/csv;charset=utf-8,${fileContent}`;
        anchor.target = '_blank';
        anchor.download = "Export.csv";
        anchor.click();

        onTerminate();
    }

    const fetch = async queryStrings => {
        try {

            return axios.get(process.env.REACT_APP_API_URL + uri + queryStrings, {
                headers: {
                    authorization: `Bearer ${database.read("authentication", "access_token")}`
                }
            });
        } catch (e) {
            onNewLog({
                color: red[500],
                content: `Une erreur s'est produite pendant la récupération`
            });
        }
    }

    const getParams = page => {
        const split = params.substring(1).split("&");
        const result = [];

        split.forEach(s => {
            if (!s.startsWith("per_page=") && !s.startsWith("page=")) {
                result.push(s);
            }
        });

        result.push(`page=${page}`);
        result.push(`per_page=50`);

        return "?" + result.join("&");
    }

    const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    return null;
}