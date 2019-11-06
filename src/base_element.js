export default class BaseElement {

    constructor() {}

    setMainElement(mainEl) {
        this.mainEl = mainEl;
        return this;
    }

    setBuilder(builder){
        this.builder = builder;
        return this;
    }
}