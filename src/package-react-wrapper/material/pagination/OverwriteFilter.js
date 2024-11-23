export default class OverwriteFilter {
    _field;
    _operator;
    _value;

    constructor(field, operator, value) {
        this._field = field;
        this._operator = operator;
        this._value = value;
    }

    toFilter() {
        return {
            key: this._field,
            operator: this._operator,
            value: this._value
        }
    }
}