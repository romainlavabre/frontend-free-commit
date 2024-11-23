import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import {store} from './store/store';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/fr";
import "@js-joda/timezone";
import database from "./package-react-wrapper/database/database";
import Router from "./router/Router";
import table from "./enum/table";
import Alert from "./package-react-wrapper/material/alert/Alert";


const darkTheme = createTheme({
    palette: database.read(table.TABLE_THEME, "white")
        ? {}
        : {
            mode: 'dark',
        },
    components: {
        MuiUseMediaQuery: {
            defaultProps: {
                noSsr: true,
            },
        },
    }
});

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeProvider theme={darkTheme}>
                <CssBaseline/>
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                    <Router/>
                    <Alert/>
                </LocalizationProvider>
            </ThemeProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytic endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
