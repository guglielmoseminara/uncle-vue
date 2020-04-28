import { BaseElement } from '../index';

export default class Rows extends BaseElement {

    constructor() {
        super();
    }

    build(parentEl) {
        this.parentEl = parentEl;
        this.rowsEl = this.parser.getElementRows(parentEl);
        return this.rowsEl ? this : null;
    }

    getAction() {
        const actionAttribute = this.parser.getAttribute(this.rowsEl, 'action');
        return actionAttribute ? this.builder.getAction(actionAttribute) : null;
    }
    
}