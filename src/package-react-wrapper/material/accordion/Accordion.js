import * as React from 'react';
import {useEffect, useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from "@mui/material/Box";
import isNull from "../../mixin/isNull";
import {AccordionActions, Switch, Tooltip} from "@mui/material";
import database from "../../database/database";
import {grey} from "@mui/material/colors";

const TABLE_NAME = "SYSTEM_ACCORDION";

/**
 *
 * @param accordionConfig {AccordionConfig}
 */
function getDefaultExpended(accordionConfig) {
    if (accordionConfig.getAccordionUnities().length === 1
        && accordionConfig.isOpenByDefaultOption()
        && !isNull(accordionConfig.getId())) {
        const defaultExpended = database.read(TABLE_NAME, accordionConfig.getId());

        if (!isNull(defaultExpended)) {
            return defaultExpended;
        }
    }

    if (accordionConfig.isOpenFirstByDefault()) {
        return "panel1";
    }

    if (accordionConfig.isOpenLastByDefault()) {
        return `panel${accordionConfig.getAccordionUnities().length}`;
    }

    return false;
}

/**
 *
 * @param AccordionConfig accordionConfig
 * @return {JSX.Element}
 */
export default function ({accordionConfig}) {
    const [expanded, setExpanded] = useState(getDefaultExpended(accordionConfig));
    const [subtitleHovered, setSubtitleHovered] = useState([]);
    const [alreadyOpened, setAlreadyOpened] = useState([]);

    useEffect(() => {
        const res = [...alreadyOpened];
        res.push(expanded);

        setAlreadyOpened(res);
    }, [expanded]);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    }

    const isDefaultExpended = () => {
        const r = database.read(TABLE_NAME, accordionConfig.getId());
        return !isNull(r) && r !== false;
    }

    const handleDefaultExpendedOptionChange = e => {
        database.write(TABLE_NAME, accordionConfig.getId(), e.target.checked ? "panel1" : false);
    }

    const handleHovered = panel => () => {
        const res = [...subtitleHovered];
        res.push(panel);

        setSubtitleHovered(res);
    }

    return (
        <div>
            {
                accordionConfig.getAccordionUnities().map((au, index) => {
                    const panel = `panel${index + 1}`;

                    return (
                        <Accordion
                            key={index}
                            expanded={expanded === panel}
                            onChange={handleChange(panel)}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls={`${panel}bh-content`}
                                id={`${panel}bh-header`}
                                onMouseEnter={handleHovered(panel)}
                            >
                                {
                                    typeof au.getSubTitle() === "string" || isNull(au.getSubTitle())
                                        ? (<>
                                                <Typography sx={{width: '33%', flexShrink: 0}}
                                                            color={isNull(au.getTitleColor()) ? "inherit" : au.getTitleColor()}>
                                                    {au.getTitle()}
                                                </Typography>
                                                <Typography sx={{color: 'text.secondary'}}>{au.getSubTitle()}</Typography>
                                            </>

                                        )
                                        : (
                                            <Box
                                                width="100%"
                                                display="flex"
                                                justifyContent="space-between"
                                                alignItems="center"
                                            >
                                                <Typography sx={{width: '33%', flexShrink: 0}} color={au.getTitleColor()}>
                                                    {au.getTitle()}
                                                </Typography>
                                                {
                                                    subtitleHovered.includes(panel) || !au.isLazySubtitleMount()
                                                        ? au.getSubTitle()
                                                        : (
                                                            <Box width={"100%"}>
                                                                <Typography color={grey[400]} fontSize={"small"}>
                                                                    Survolez pour visualiser
                                                                </Typography>
                                                            </Box>
                                                        )
                                                }
                                            </Box>
                                        )
                                }
                            </AccordionSummary>
                            <AccordionDetails>
                                {au.isLazyComponentMount() && expanded !== panel && !alreadyOpened.includes(panel) ? null : au.getComponent()}
                            </AccordionDetails>
                            {
                                accordionConfig.getAccordionUnities().length === 1
                                && accordionConfig.isOpenByDefaultOption()
                                && !isNull(accordionConfig.getId())
                                    ? (
                                        <AccordionActions>
                                            <Box>
                                                <Tooltip title={"Ouvrir par défaut (Dégrade les performances)"}>
                                                    <Switch defaultChecked={isDefaultExpended()}
                                                            onChange={handleDefaultExpendedOptionChange}/>
                                                </Tooltip>
                                            </Box>
                                        </AccordionActions>
                                    )
                                    : null
                            }

                        </Accordion>
                    )
                })
            }
        </div>
    );
}