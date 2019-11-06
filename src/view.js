import { BaseElement } from './index';

export default class View extends BaseElement {

    constructor() {
        super();
    }

    build(viewName) {
        this.viewEl = this.mainEl.querySelector(`views view[name="${viewName}"]`);
        this.name = viewName;
        return this;
    }

    getPage() {
        return this.builder.getPage(this.viewEl);
    }
}