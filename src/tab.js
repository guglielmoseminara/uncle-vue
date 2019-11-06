import { BaseElement } from './index';

export default class Tab extends BaseElement {

    constructor() {
        super();
    }

    build(parentEl, tabName) {
        this.tabEl = parentEl.querySelector(`tabs tab[name="${tabName}"]`);
        this.name = tabName;
        this.view = this.builder.getView(this.tabEl.getAttribute('name'));
        return this;
    }
}