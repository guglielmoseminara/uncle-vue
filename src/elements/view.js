import { BaseElement } from '../index';

export default class View extends BaseElement {

    constructor() {
        super();
    }

    build(viewName) {
        this.name = viewName;
        this.viewEl = this.parser.getView(viewName);
        const ssrActionAttribute = this.parser.getAttribute(this.viewEl, 'ssr-action');
        this.ssrAction = ssrActionAttribute ? this.builder.getAction(ssrActionAttribute) : null;
        return this;
    }

    getPage() {
        return this.parser.getViewPage(this.viewEl) ? this.builder.getPage(this.viewEl) : null;
    }
}