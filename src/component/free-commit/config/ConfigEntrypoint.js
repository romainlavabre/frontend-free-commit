import {Grid} from "@mui/material";
import Accordion from "../../../package-react-wrapper/material/accordion/Accordion";
import AccordionConfig from "../../../package-react-wrapper/material/accordion/AccordionConfig";
import AccordionUnity from "../../../package-react-wrapper/material/accordion/AccordionUnity";
import Env from "./Env";
import Email from "./Email";

export default function () {

    return (
        <Grid container spacing={2}>
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