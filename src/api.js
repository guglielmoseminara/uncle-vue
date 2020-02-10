import { BaseElement } from './index';

export default class Api extends BaseElement {

    constructor() {
        super();
    }

    build(apiName) {
        this.apiEl = this.mainEl.querySelector(`api[name="${apiName}"]`);
        this.baseUrl = this.apiEl.getAttribute('base-url');
        this.name = apiName;
        return this;
    }

    setMethod(methodObject) {
        this.method = methodObject;
        return this;
    }

    setRequest(requestObject) {
        this.request = requestObject;
        return this;
    }

    execute() {

    }
}