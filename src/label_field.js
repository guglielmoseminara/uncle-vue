import { Label } from './index';

export default class LabelField extends Label { 

    constructor() {
        super();
    }

    build(parentEl) {
        super.build(parentEl);

        const field = this.labelEl.querySelector(':scope > field');
        this.field = this.builder.getField(this.labelEl, field.getAttribute('name'));
        return this;
    }
}