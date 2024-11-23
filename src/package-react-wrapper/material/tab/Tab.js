import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import TabPanel from "@mui/lab/TabPanel";
import * as React from "react";
import {useState} from "react";
import isNull from "../../mixin/isNull";
import {AppBar, useMediaQuery} from "@mui/material";
import database from "../../database/database";

const TABLE_NAME = "SYSTEM_TAB";

/**
 *
 * @param tabConfig TabConfig
 */
function getDefault(tabConfig) {
    if (tabConfig.isWithPersistence()) {
        const defaultIndex = database.read(TABLE_NAME, tabConfig.getId());

        if (!isNull(defaultIndex)) {
            if (parseInt(defaultIndex) <= tabConfig.getTabUnities().length) {
                return defaultIndex;
            }
        }
    }

    if (!isNull(tabConfig.getDefault())) {
        return (tabConfig.getTabUnities().findIndex(tu => tu.getName() === tabConfig.getDefault()) + 1).toString();
    }

    return "1";
}

/**
 *
 * @param TabConfig tabConfig
 * @return {JSX.Element}
 */
export default function ({tabConfig}) {
    const isTablet = useMediaQuery(theme => theme.breakpoints.down('md'));
    const [tab, setTab] = useState(getDefault(tabConfig));

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const saveChoice = indexAsString => () => {
        if (tabConfig.isWithPersistence()) {
            database.write(TABLE_NAME, tabConfig.getId(), indexAsString);
        }
    }

    return (
        <div>
            <Box sx={{width: '100%', typography: 'body1'}}>
                <TabContext value={tab}>
                    <Box sx={{
                        borderBottom: tabConfig.getBorderWith(),
                        borderColor: 'divider'
                    }}>
                        <AppBar position="static">
                            <TabList
                                variant={isTablet ? "scrollable" : "fullWidth"}
                                onChange={handleChange}
                                indicatorColor={tabConfig.getColor()}
                                textColor={"inherit"}
                                scrollButtons
                                allowScrollButtonsMobile
                            >
                                {
                                    tabConfig.getTabUnities().map((tu, index) =>
                                        <Tab
                                            key={index + 1}
                                            value={(index + 1).toString()}
                                            label={tu.getName()}
                                            title={tu.getTitle()}
                                            onClick={saveChoice((index + 1).toString())}
                                            disabled={tu.isDisabled()}
                                        />
                                    )
                                }
                            </TabList>
                        </AppBar>
                    </Box>
                    {
                        tabConfig.getTabUnities().map((tu, index) => {

                            if (tu.getPadding() != null) {
                                return (
                                    <TabPanel key={index + 1} value={(index + 1).toString()}
                                              sx={{padding: tu.getPadding()}}>
                                        {tu.getComponent()}
                                    </TabPanel>
                                )
                            }

                            return (
                                <TabPanel key={index + 1} value={(index + 1).toString()}>
                                    {tu.getComponent()}
                                </TabPanel>
                            )
                        })
                    }
                </TabContext>
            </Box>
        </div>
    );
}