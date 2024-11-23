export default class ListConfig {
    _listUnities = [];

    /**
     *
     * @return {ListUnity[]}
     */
    getListUnities() {
        return this._listUnities;
    }

    addListUnity(listUnity) {
        this._listUnities.push(listUnity);
        return this;
    }

}