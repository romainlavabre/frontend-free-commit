export default class ModalConfig {
    _component;
    _height = "80%";
    _width = "80%";
    _onClose = null;

    getComponent() {
        return this._component;
    }

    setComponent(component) {
        this._component = component;
        return this;
    }

    getHeight() {
        return this._height;
    }

    setHeight(height) {
        this._height = height;
        return this;
    }

    getWidth() {
        return this._width;
    }

    setWidth(width) {
        this._width = width;
        return this;
    }

    executeOnClose() {
        if (this._onClose != null) {
            this._onClose();
        }
    }

    setOnClose(onClose) {
        this._onClose = onClose;
        return this;
    }
}