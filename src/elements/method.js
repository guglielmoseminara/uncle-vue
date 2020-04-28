import { BaseElement } from '../index';

export default class Method extends BaseElement {

    constructor() {
        super();
    }

    build(methodName) {
        this.name = methodName;
        this.methodEl = this.parser.getSdkMethod(methodName);
        this.resource = this.parser.getAttribute(this.methodEl, 'resource');
        this.route = this.parser.getAttribute(this.methodEl, 'route');
        this.api = this.parser.getAttribute(this.methodEl, 'api');
        return this;
    }
}