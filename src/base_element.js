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

    setServiceManager(serviceManager) {
        this.serviceManager = serviceManager;
        return this;
    }

    setParamsManager(paramsManager) {
        this.paramsManager = paramsManager;
        return this;
    }

    setClassName(className) {
        this.className = className;
        return this;
    }

    setParser(parser) {
        this.parser = parser;
        return this;
    }

    setMomentManager(moment) {
        this.momentManager = moment;
        return this;
    }
}