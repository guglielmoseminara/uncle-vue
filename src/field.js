import { BaseElement } from './index';

export default class Field extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) { 
        this.fieldEl = parentEl.querySelector(`fields field[name='${fieldName}']`);
        this.parentEl = parentEl;
        this.name = fieldName;
        this.text = this.fieldEl.getAttribute('text') != null ? this.fieldEl.getAttribute('text') : this.fieldEl.innerHTML;
        this.type = this.fieldEl.getAttribute('type');
        this.validator = this.fieldEl.getAttribute('validator');
        this.value = this.fieldEl.getAttribute('value');
        this.bind = this.fieldEl.getAttribute('bind');
        this.sortable = this.fieldEl.getAttribute('sortable');
        this.widget = this.fieldEl.getAttribute('widget');
        this.format = this.fieldEl.getAttribute('format');
        return this;
    }

    getFields() {
        const fields = this.fieldEl.querySelectorAll(':scope > field');
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.fieldEl, field.getAttribute('name'));
        });
        return this.fields;
    }

    getDefault() {
        return null;
    }

} 