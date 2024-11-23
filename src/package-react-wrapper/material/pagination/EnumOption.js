export default class EnumOption {
    _value;
    _text;
    _overwriteFilters = [];


    /**
     *
     * @param value {*}
     * @param text {string}
     * @param overwriteFilters {OverwriteFilter[]}
     */
    constructor(value, text, overwriteFilters = []) {
        this._value = value;
        this._text = text;
        this._overwriteFilters = overwriteFilters;
    }

    getValue() {
        return this._value;
    }

    getText() {
        return this._text;
    }

    isOverwriteFilter() {
        return this._overwriteFilters.length !== 0;
    }

    /**
     *
     * @return {OverwriteFilter[]}
     */
    getOverwriteFilters() {
        return this._overwriteFilters;
    }

}