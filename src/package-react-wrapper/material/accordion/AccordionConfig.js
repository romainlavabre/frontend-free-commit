import isNull from "../../mixin/isNull";

export default class AccordionConfig {

    _accordionUnities = [];
    _openLastByDefault = false;
    _openFirstByDefault = false;
    _openByDefaultOption = false;
    _id = null;

    /**
     *
     * @return {AccordionUnity[]}
     */
    getAccordionUnities() {
        return this._accordionUnities;
    }

    addAccordionUnity(accordionUnity) {
        this._accordionUnities.push(accordionUnity);
        return this;
    }

    isOpenLastByDefault() {
        return this._openLastByDefault;
    }

    setOpenLastByDefault(openLastByDefault) {
        this._openLastByDefault = openLastByDefault;
        return this;
    }

    isOpenFirstByDefault() {
        return this._openFirstByDefault;
    }

    setOpenFirstByDefault(openFirstByDefault) {
        this._openFirstByDefault = openFirstByDefault;
        return this;
    }

    isOpenByDefaultOption() {
        return this._openByDefaultOption;
    }

    /**
     * /!\ Work only when user provide a once unity </br>
     * Save in local storage the open by default option </br>
     * Using the openFirstByDefault field to check by default </br>
     * Default : false
     *
     * @param openByDefaultOption {boolean}
     * @param id {string}
     * @return {AccordionConfig}
     */
    setOpenByDefaultOption(openByDefaultOption, id = null) {
        this._openByDefaultOption = openByDefaultOption;
        this._id = id;

        if (this._openByDefaultOption && isNull(this._id)) {
            console.warn("[ACCORDION] Provide an ID to enable default expended option")
        }

        return this;
    }

    getId() {
        return this._id;
    }
}