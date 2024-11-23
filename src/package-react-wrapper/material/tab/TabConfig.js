import isNull from "../../mixin/isNull";

export default class TabConfig {
    _color = "primary";
    _borderWith = 0;
    _tabUnities = [];
    _default = null;
    _withPersistence = false;
    _id = null;

    getColor() {
        return this._color;
    }

    setColor(color) {
        this._color = color;

        return this;
    }

    getBorderWith() {
        return this._borderWith;
    }

    setBorderWith(borderWith) {
        this._borderWith = borderWith;

        return this;
    }

    /**
     *
     * @return {TabUnity[]}
     */
    getTabUnities() {
        return this._tabUnities;
    }

    addTabUnity(tabUnity) {
        this._tabUnities.push(tabUnity);

        return this;
    }

    getDefault() {
        return this._default;
    }

    setDefault(defaultVal) {
        this._default = defaultVal;
        return this;
    }

    isWithPersistence() {
        return this._withPersistence && !isNull(this._id);
    }

    /**
     * Save the last selection in local storage <br/>
     *
     * @param enable Default : false
     * @param id Unique id
     * @return {TabConfig}
     */
    setWithPersistence(enable, id) {
        this._withPersistence = enable;
        this._id = id;

        if (this.isWithPersistence() && isNull(this.getId())) {
            console.warn("[TAB] Provide an ID to enable persistence")
        }

        return this;
    }

    getId() {
        return this._id;
    }

}