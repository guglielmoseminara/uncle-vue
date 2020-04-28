import { BaseElement } from '../../index';

export default class Api extends BaseElement {

    constructor() {
        super();
    }

    build(apiName) {
        this.apiEl = this.parser.getApi(apiName);
        this.baseUrl = this.parser.getAttribute(this.apiEl, 'base-url');
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