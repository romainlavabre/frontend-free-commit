import Type from "./Type";
import FilterField from "./FilterField";
import isNull from "../../mixin/isNull";
import EnumConfig from "./EnumConfig";
import EnumOption from "./EnumOption";
import EditCellRender from "./EditCellRender";
import database from "../../database/database";

export default class PaginationColumn {
    _field;
    _header;
    _defaultWidth = 150;
    _editable = false;
    _editHandler = null;
    _editCustomComponent = null;
    _description = null;
    _sortable = false;
    _valueCompiler = null;
    _type = Type.STRING;
    _enumConfig = null;
    _disableSearchOption = false;
    _minWidth = null;
    _formatBeforeSearching = value => value;


    getField() {
        return this._field;
    }

    setField(field) {
        this._field = field;
        return this;
    }

    getHeader() {
        return this._header;
    }

    setHeader(header) {
        this._header = header;
        return this;
    }

    getDefaultWidth() {
        return this._defaultWidth;
    }

    /**
     * Width as percent, for 10 %, set 0.1
     * @param width
     * @return {PaginationColumn}
     */
    setDefaultWidth(width) {
        this._defaultWidth = width;
        return this;
    }

    isEditable() {
        return this._editable;
    }

    /**
     *
     * @param isEditable {boolean}
     * @param handler {function(row, event)}
     * @param customComponent {function(row) : JSX}
     * @return {PaginationColumn}
     */
    setEditable(isEditable, handler, customComponent = null) {
        this._editable = isEditable;
        this._editHandler = handler;
        this._editCustomComponent = customComponent;

        return this;
    }

    getEditHandler() {
        return this._editHandler;
    }

    getEditCustomComponent() {
        return this._editCustomComponent;
    }

    getDescription() {
        return this._description;
    }

    setDescription(description) {
        this._description = description;
        return this;
    }

    isSortable() {
        return this._sortable;
    }

    setSortable(sortable) {
        this._sortable = sortable;
    }

    getValueCompiler() {
        return this._valueCompiler;
    }

    setValueCompiler(compiler) {
        this._valueCompiler = compiler;
        return this;
    }

    getType() {
        return this._type;
    }

    setType(type) {
        this._type = type;
        return this;
    }

    getEnumConfig() {
        if (this._type === Type.ENUM && isNull(this._enumConfig)) {
            console.error("PaginationColumn : Type enum require an EnumConfig");
            return new EnumConfig()
                .addOption(new EnumOption("ERROR", "ERROR"));
        }

        return this._enumConfig;
    }

    /**
     * Class EnumConfig, required if you use Type.ENUM
     *
     * @param enumConfig {EnumConfig}
     * @return {PaginationColumn}
     */
    setEnumConfig(enumConfig) {
        this._enumConfig = enumConfig;
        return this;
    }

    getFormatBeforeSearching() {
        return this._formatBeforeSearching;
    }

    /**
     * Called before filter change, your function must return formatted value, used only by filter <br/>
     * Optional
     *
     * @param formatBeforeSearching {function}
     * @return {PaginationColumn}
     */
    setFormatBeforeSearching(formatBeforeSearching) {
        this._formatBeforeSearching = formatBeforeSearching;
        return this;
    }

    isDisableSearchOption() {
        return this._disableSearchOption;
    }

    /**
     * Disable the selectable operator
     * Default : false
     * @param disable
     */
    setDisableSearchOption(disable) {
        this._disableSearchOption = disable;

        return this;
    }

    setMinWidth(minWidth) {
        this._minWidth = minWidth;

        return this;
    }

    /**
     *
     * @param onChange
     * @param defaultValue
     * @param paginationConfig {PaginationConfig}
     * @return {{headerClassName: string, filterable: boolean, renderEditCell: (function(*): *), headerName, field, renderHeader: (function(): *), flex: number, editable: boolean, description: (*|null), sortable: boolean, renderCell: ((function(*): *)|undefined)}}
     */
    toDataGridColumn(onChange, defaultValue, paginationConfig) {
        const width = database.read("pagination", paginationConfig.getId() + "col-dim")?.[this._field];

        return {
            field: this._field,
            headerName: this._header,
            headerClassName: "bg-inherit",
            description: this._description === null ? this._header : this._description,
            sortable: this._sortable,
            flex: isNull(width) ? this._defaultWidth : 0,
            width: !isNull(width) ? width : undefined,
            minWidth: !isNull(this._minWidth) ? this._minWidth : undefined,
            filterable: false,
            editable: this._editable,
            renderEditCell: params => <EditCellRender
                paginationColumn={this}
                defaultValue={params.row[this._field]}
                row={params.row}
            />,
            renderCell: this._valueCompiler !== null ? value => this._valueCompiler(value.row) : undefined,
            renderHeader: () => <FilterField onChange={onChange} paginationColumn={this} defaultValue={defaultValue}/>
        }
    }


}