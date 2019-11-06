import { BaseElement } from './index';

export default class Resource extends BaseElement {

    constructor() {
        super();
    }

    build(apiEl, resourceName) {
        this.resourceEl = apiEl.querySelector(`resources resource[name="${resourceName}"]`);
        this.name = resourceName;
        return this;
    }
}