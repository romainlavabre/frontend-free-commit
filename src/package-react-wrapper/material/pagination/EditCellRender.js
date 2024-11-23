import Type from "./Type";
import {Checkbox, IconButton, TextField} from "@mui/material";
import isNull from "../../mixin/isNull";
import dayjs from "dayjs";
import {DatePicker, DateTimePicker, TimePicker} from "@mui/x-date-pickers";
import {Close} from "@mui/icons-material";
import {ZonedDateTime, ZoneId} from "@js-joda/core";

/**
 *
 * @param paginationColumn {PaginationColumn}
 * @param defaultValue
 * @param rowId
 */
export default function ({paginationColumn, defaultValue, row}) {

    const handleChange = async e => {
        if (isNull(paginationColumn.getEditHandler())) {
            console.warn("[PAGINATION] No edit handler function provided");
            return;
        }

        await paginationColumn.getEditHandler()(row, e);
    }

    const handleKeyDown = async e => {
        if (e.key !== "Enter") return;

        if (isNull(paginationColumn.getEditHandler())) {
            console.warn("[PAGINATION] No edit handler function provided");
            return;
        }

        await paginationColumn.getEditHandler()(row, e);
    }

    if (!isNull(paginationColumn.getEditCustomComponent())) {
        return paginationColumn.getEditCustomComponent()(row);
    }

    if (paginationColumn.getType() === Type.BOOLEAN) {
        return (
            <>
                <Checkbox
                    defaultChecked={isNull(defaultValue) ? false : JSON.parse(defaultValue.toLowerCase())}
                    onChange={handleChange}
                />

                <IconButton onClick={() => handleChange({target: {checked: null}})}>
                    <Close/>
                </IconButton>
            </>
        );
    }

    if (paginationColumn.getType() === Type.NUMBER
        || paginationColumn.getType() === Type.STRING) {
        return (
            <TextField
                fullWidth
                autoFocus
                variant="outlined"
                type={paginationColumn.getType() === Type.NUMBER ? "number" : "text"}
                defaultValue={defaultValue}
                onKeyDown={handleKeyDown}
            />
        )
    }

    if (paginationColumn.getType() === Type.DATETIME) {
        return (
            <DateTimePicker
                format={"DD/MM/YYYY HH:mm"}
                ampm={false}
                defaultValue={dayjs(defaultValue)}
                slotProps={{
                    actionBar: {
                        actions: ['clear'],
                    },
                    textField: {
                        fullWidth: true,
                        variant: "outlined"
                    }
                }}
                onAccept={val => {
                    handleChange({
                        target: {
                            value: isNull(val) ? null : dayjs(val).toISOString()
                        }
                    });
                }}
            />
        )
    }

    if (paginationColumn.getType() === Type.DATE) {
        return (
            <DatePicker
                format={"DD/MM/YYYY"}
                defaultValue={dayjs(defaultValue)}
                slotProps={{
                    actionBar: {
                        actions: ['clear'],
                    },
                    textField: {
                        fullWidth: true,
                        variant: "outlined",
                    }
                }}
                onAccept={val => {
                    handleChange({
                        target: {
                            value: isNull(val) ? null : ZonedDateTime.parse(dayjs(val).toISOString()).withZoneSameInstant(ZoneId.of("Europe/Paris")).toLocalDate().toString()
                        }
                    });
                }}
            />
        )
    }

    if (paginationColumn.getType() === Type.TIME) {
        return (
            <TimePicker
                defaultValue={!isNull(defaultValue) ? dayjs().hour(defaultValue.split(":")[0]).minute(defaultValue.split(":")[1]) : undefined}
                slotProps={{
                    actionBar: {
                        actions: ['clear'],
                    },
                    textField: {
                        fullWidth: true,
                        variant: "outlined",
                    }
                }}
                onAccept={val => {
                    handleChange({
                        target: {
                            value: isNull(val) ? null : ZonedDateTime.parse(dayjs(val).toISOString()).withZoneSameInstant(ZoneId.of("Europe/Paris")).toLocalTime().toString()
                        }
                    });
                }}
            />
        )
    }

    return null;
}