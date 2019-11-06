import { BaseElement } from './index';

export default class Rows extends BaseElement {

    constructor() {
        super();
    }

    build(parentEl) {
        this.rowsEl = parentEl.querySelector('rows');
        return this.rowsEl ? this : null;
    }

    getAction() {
        return this.rowsEl.getAttribute('action') ? this.builder.getAction(this.rowsEl.getAttribute('action')) : null;
    }
    
}