import {Alert, Grid, Link} from "@mui/material";
import Accordion from "../../../package-react-wrapper/material/accordion/Accordion";
import AccordionConfig from "../../../package-react-wrapper/material/accordion/AccordionConfig";
import AccordionUnity from "../../../package-react-wrapper/material/accordion/AccordionUnity";
import Env from "./Env";
import Email from "./Email";
import Box from "@mui/material/Box";

export default function () {

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Box width={"30%"}>
                    <Alert severity={"info"}>
                        <Link
                            href={"https://romain.gitbook.io/free-commit/installation/environment-variables"}
                            target={"_blank"}
                        >
                            Read more about the environment variables
                        </Link>
                    </Alert>
                </Box>
            </Grid>
            <Grid item xs={12} md={6}>
                <Accordion
                    accordionConfig={
                        new AccordionConfig()
                            .setOpenFirstByDefault(true)
                            .addAccordionUnity(
                                new AccordionUnity()
                                    .setTitle("Environment")
                                    .setComponent(<Env/>)
                            )
                    }
                />
            </Grid>
            <Grid item xs={12} md={6}>
                <Accordion
                    accordionConfig={
                        new AccordionConfig()
                            .setOpenFirstByDefault(true)
                            .addAccordionUnity(
                                new AccordionUnity()
                                    .setTitle("Email")
                                    .setComponent(<Email/>)
                            )
                    }
                />
            </Grid>
        </Grid>
    )
}