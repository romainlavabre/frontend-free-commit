import {FormControl, IconButton, InputLabel, MenuItem, Select, TextField} from "@mui/material";
import Type from "./Type";
import {useRef, useState} from "react";
import {MobileDatePicker, MobileTimePicker} from "@mui/x-date-pickers";
import useHelper from "../../use/useHelper";
import dayjs from "dayjs";
import {LocalDate, LocalTime} from "@js-joda/core";
import {Clear} from "@mui/icons-material";
import isNull from "../../mixin/isNull";
import Typography from "@mui/material/Typography";
import {grey} from "@mui/material/colors";


export default function ({onChange, defaultValue, paginationColumn}) {
    const helper = useHelper();
    const searchInput = useRef();
    const operatorInput = useRef();
    const [reload, setReload] = useState(helper.uuid());

    const handleSearchChange = e => {
        if (e.key === "Enter") {
            onChange({
                key: paginationColumn.getField(),
                operator: !isNull(operatorInput.current) ? operatorInput.current.value : Type.toOperator(paginationColumn.getType())[0].operator,
                value: searchInput.current.value
            });
        }
    }

    const handleOperatorChange = e => {
        onChange({
            key: paginationColumn.getField(),
            operator: e.target.value,
            value: searchInput.current.value
        });
    }

    const handleSelectBooleanChange = e => {
        onChange({
            key: paginationColumn.getField(),
            operator: "eq",
            value: e.target.value
        });
    }

    const handleSelectEnumChange = e => {
        onChange({
            key: paginationColumn.getField(),
            operator: "eq",
            value: e.target.value
        });
    }

    const handleDateChange = value => {
        onChange({
            key: paginationColumn.getField(),
            operator: "contains",
            value: value
        });
    }

    if (paginationColumn.getType() === Type.STRING) {
        return (
            <TextField
                className={"MuiDataGrid-columnHeaders"}
                inputRef={searchInput}
                variant={"standard"}
                name={paginationColumn.getField()}
                label={paginationColumn.getHeader()}
                fullWidth={true}
                onKeyDown={handleSearchChange}
                defaultValue={!isNull(defaultValue) ? defaultValue.value : ""}
                InputProps={{
                    startAdornment: !paginationColumn.isDisableSearchOption() && (
                        <FormControl>
                            <Select
                                inputRef={operatorInput}
                                defaultValue={!isNull(defaultValue) ? defaultValue.operator : Type.toOperator(paginationColumn.getType())[0].operator}
                                variant={"standard"}
                                onChange={handleOperatorChange}
                            >
                                {
                                    Type.toOperator(paginationColumn.getType()).map(t => (
                                        <MenuItem key={t.text} value={t.operator}>{t.text}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    )
                }}
            />
        )
    }

    if (paginationColumn.getType() === Type.NUMBER) {
        return (
            <TextField
                className={"MuiDataGrid-columnHeaders"}
                inputRef={searchInput}
                variant={"standard"}
                type="number"
                name={paginationColumn.getField()}
                label={paginationColumn.getHeader()}
                fullWidth={true}
                onKeyDown={handleSearchChange}
                defaultValue={!isNull(defaultValue) ? defaultValue.value : ""}
                InputProps={{
                    startAdornment: !paginationColumn.isDisableSearchOption() && (
                        <FormControl>
                            <Select
                                inputRef={operatorInput}
                                defaultValue={!isNull(defaultValue) ? defaultValue.operator : Type.toOperator(paginationColumn.getType())[0].operator}
                                variant={"standard"}
                                onChange={handleOperatorChange}
                            >
                                {
                                    Type.toOperator(paginationColumn.getType()).map(t => (
                                        <MenuItem key={t.text} value={t.operator}>{t.text}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    )
                }}
            />
        )
    }

    if (paginationColumn.getType() === Type.BOOLEAN) {
        return (
            <FormControl fullWidth={true} className={"MuiDataGrid-columnHeaders"}>
                <InputLabel
                    variant={"standard"}>{paginationColumn.getHeader()}</InputLabel>
                <Select
                    fullWidth={true}
                    variant={"standard"}
                    onChange={handleSelectBooleanChange}
                    defaultValue={!isNull(defaultValue) ? defaultValue.value : ""}
                    label={paginationColumn.getHeader()}
                >
                    <MenuItem defaultChecked value="">TOUT</MenuItem>
                    <MenuItem value={"1"}>OUI</MenuItem>
                    <MenuItem value={"0"}>NON</MenuItem>
                </Select>
            </FormControl>

        );
    }

    if (paginationColumn.getType() === Type.ENUM) {
        /** @type EnumConfig */
        const enumConfig = paginationColumn.getEnumConfig();

        return (
            <FormControl fullWidth={true} className={"MuiDataGrid-columnHeaders"}>
                <InputLabel
                    variant={"standard"}>{paginationColumn.getHeader()}</InputLabel>
                <Select
                    fullWidth={true}
                    variant={"standard"}
                    onChange={handleSelectEnumChange}
                    multiple={enumConfig.isMultiple()}
                    defaultValue={!isNull(defaultValue) ? defaultValue.value : (enumConfig.isMultiple() ? [] : "")}
                    label={paginationColumn.getHeader()}
                >
                    {
                        enumConfig.isMultiple()
                            ? null
                            : <MenuItem defaultChecked value="">TOUT</MenuItem>
                    }
                    {
                        enumConfig.getOptions().map(eo => (
                            <MenuItem
                                key={eo.getValue()}
                                value={eo.isOverwriteFilter() ? JSON.stringify({overwrite: eo.getOverwriteFilters().map(of => of.toFilter())}) : eo.getValue()}
                            >
                                {eo.getText()}
                            </MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
        );
    }

    if (paginationColumn.getType() === Type.DATE
        || paginationColumn.getType() === Type.DATETIME) {
        return (
            <MobileDatePicker
                className={"MuiDataGrid-columnHeaders"}
                key={reload}
                inputRef={searchInput}
                label={paginationColumn.getHeader()}
                format={"DD/MM/YYYY"}
                formatDensity={"dense"}
                closeOnSelect={true}
                defaultValue={!isNull(defaultValue) ? dayjs(defaultValue.value) : null}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        variant: "standard",
                        InputProps: {
                            endAdornment: (
                                <IconButton
                                    onClick={e => {
                                        searchInput.current.value = "";
                                        handleDateChange("");
                                        setReload(helper.uuid());
                                        e.stopPropagation();
                                    }}
                                >
                                    <Clear/>
                                </IconButton>
                            )
                        }
                    }
                }}
                onChange={e => {
                    if (e === null) {
                        handleDateChange("");
                        return;
                    }
                    handleDateChange(LocalDate.parse(dayjs(e).toISOString().split("T")[0]).plusDays(1).toString())
                }}
            />
        )
    }


    if (paginationColumn.getType() === Type.TIME) {
        return (
            <MobileTimePicker
                className={"MuiDataGrid-columnHeaders"}
                key={reload}
                inputRef={searchInput}
                label={paginationColumn.getHeader()}
                format={"hh:mm"}
                formatDensity={"dense"}
                ampm={false}
                closeOnSelect={true}
                defaultValue={!isNull(defaultValue) ? dayjs(defaultValue.value, "hh:mm") : null}
                slotProps={{
                    textField: {
                        fullWidth: true,
                        variant: "standard",
                        InputProps: {
                            endAdornment: (
                                <IconButton
                                    onClick={e => {
                                        searchInput.current.value = "";
                                        handleDateChange("");
                                        setReload(helper.uuid());
                                        e.stopPropagation();
                                    }}
                                >
                                    <Clear/>
                                </IconButton>
                            )
                        }
                    }
                }}
                onChange={e => {
                    if (e === null) {
                        handleDateChange("");
                        return;
                    }
                    handleDateChange(LocalTime.parse(dayjs(e).toISOString().split("T")[1].replace("Z", "")).toString())
                }}
            />
        )
    }

    if (paginationColumn.getType() === null) {
        return <Typography fontSize="small" color={grey[400]}>{paginationColumn.getHeader()}</Typography>;
    }

    return "Unknown type";
}