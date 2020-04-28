import { BaseElement } from '../index';

export default class Resource extends BaseElement {

    constructor() {
        super();
    }

    build(apiEl, resourceName) {
        this.name = resourceName;
        this.resourceEl = this.parser.getApiResource(apiEl, resourceName);
        return this;
    }
}