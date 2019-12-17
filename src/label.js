import { BaseElement } from './index';

export default class Label extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl) { 
        this.labelEl = parentEl.querySelector(`label`);
        this.parentEl = parentEl;
        this.type = this.labelEl.getAttribute('type');
        return this;
    }

} 