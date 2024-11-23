export default class TabUnity {
    _name;
    _component;
    _padding = null;
    _title = "";
    _disabled = false;

    getName() {
        return this._name;
    }

    setName(name) {
        this._name = name;

        return this;
    }

    getComponent() {
        return this._component;
    }

    setComponent(component) {
        this._component = component;

        return this;
    }

    getPadding() {
        return this._padding;
    }

    /**
     * Remove padding<br/>
     * Default: false
     * @param padding
     * @return {TabUnity}
     */
    setPadding(padding) {
        this._padding = padding;
        return this;
    }

    getTitle() {
        return this._title;
    }

    /**
     * Showed as tooltip
     *
     * @param title
     * @return {TabUnity}
     */
    setTitle(title) {
        this._title = title;
        return this;
    }

    isDisabled() {
        return this._disabled;
    }

    /**
     *
     * @param disabled
     * @return {TabUnity}
     */
    setDisabled(disabled) {
        this._disabled = disabled;
        return this;
    }
}