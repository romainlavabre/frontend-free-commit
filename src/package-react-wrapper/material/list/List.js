import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

/**
 *
 * @param ListConfig listConfig
 * @return {JSX.Element}
 */
export default function ({listConfig}) {
    return (
        <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
            {
                listConfig.getListUnities().map((lu, index) => (
                    <ListItem key={index}>
                        {lu.getComponent()}
                    </ListItem>
                ))
            }
        </List>
    );
}