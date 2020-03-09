import { BaseElement } from './index';
import { List } from 'collections/list';

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
        return this.viewEl.querySelector('page') ? this.builder.getPage(this.viewEl) : null;
    }
}