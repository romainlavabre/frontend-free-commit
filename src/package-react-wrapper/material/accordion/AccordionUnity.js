export default class AccordionUnity {
    _title;
    _titleColor;
    _subTitle;
    _component;
    _lazyComponentMount = false;
    _lazySubtitleMount = false;

    getTitle() {
        return this._title;
    }

    setTitle(title) {
        this._title = title;
        return this;
    }

    getTitleColor() {
        return this._titleColor;
    }

    setTitleColor(titleColor) {
        this._titleColor = titleColor;
        return this;
    }

    getSubTitle() {
        return this._subTitle;
    }

    setSubTitle(subTitle) {
        this._subTitle = subTitle;
        return this;
    }

    getComponent() {
        return this._component;
    }

    setComponent(component) {
        this._component = component;
        return this;
    }

    isLazyComponentMount() {
        return this._lazyComponentMount;
    }

    /**
     * Mount component on open </br>
     * Default : false
     *
     * @param lazy {boolean}
     * @return {AccordionUnity}
     */
    setLazyComponentMount(lazy) {
        this._lazyComponentMount = lazy;

        return this;
    }

    isLazySubtitleMount() {
        return this._lazySubtitleMount;
    }

    /**
     * Mount subtitle on hover </br>
     * Default : false
     *
     * @param lazy {boolean}
     * @return {AccordionUnity}
     */
    setLazySubtitleMount(lazy) {
        this._lazySubtitleMount = lazy;

        return this;
    }
}