import {Avatar} from "@mui/material";
import {blue, deepOrange, green, pink, red, teal} from "@mui/material/colors";

export default function ({text}) {

    const getColor = () => {
        const firstLetter = text.substring(0, 1).toLowerCase();

        if (["a", "k", "t"].includes(firstLetter)) {
            return deepOrange[500];
        }

        if (["b", "l", "u", "g"].includes(firstLetter)) {
            return green[500];
        }

        if (["c", "m", "v"].includes(firstLetter)) {
            return teal[900];
        }

        if (["d", "n", "w", "s"].includes(firstLetter)) {
            return pink[500];
        }

        if (["e", "o", "x", "j"].includes(firstLetter)) {
            return teal[500];
        }

        if (["f", "p", "y", "q"].includes(firstLetter)) {
            return red[500];
        }

        if (["h", "r", "i", "z"].includes(firstLetter)) {
            return blue[500];
        }

    }
    return <Avatar sx={{bgcolor: getColor(), color: "white"}}>{text}</Avatar>;
}