export default class FileData {
    _id;
    _name;
    _base64;
    _contentType;


    constructor(name, base64, contentType) {
        this._name = name;
        this._base64 = base64;
        this._contentType = contentType;
    }

    _setId(id) {
        this._id = id;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getBase64() {
        return this._base64;
    }

    getContentType() {
        return this._contentType;
    }
}