export default class EnumConfig {
    _multiple = true;
    _options = [];

    isMultiple() {
        return this._multiple;
    }

    /**
     * Allow multiple value in selectable list <br/>
     * Default : true
     *
     * @param multiple
     * @return {EnumConfig}
     */
    setMultiple(multiple) {
        this._multiple = multiple;
        return this;
    }

    getOptions() {
        return this._options;
    }

    /**
     * Option ...
     *
     * @param option {EnumOption}
     * @return {EnumConfig}
     */
    addOption(option) {
        this._options.push(option)
        return this;
    }

}