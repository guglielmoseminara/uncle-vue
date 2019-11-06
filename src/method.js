import { BaseElement } from './index';

export default class Method extends BaseElement {

    constructor() {
        super();
    }

    build(methodName) {
        this.methodEl = this.mainEl.querySelector(`sdk method[name="${methodName}"]`);
        this.resource = this.methodEl.getAttribute('resource');
        this.route = this.methodEl.getAttribute('route');
        this.api = this.methodEl.getAttribute('api');
        this.name = methodName;
        return this;
    }
}