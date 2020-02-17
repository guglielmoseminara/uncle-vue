import { BaseElement } from './index';

export default class Field extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        if (parentEl.tagName == 'field') {
            this.fieldEl = parentEl.querySelector(`:scope > field[name='${fieldName}']`);
        } else {
            this.fieldEl = parentEl.querySelector(`fields > field[name='${fieldName}']`);
        }
        this.parentEl = parentEl;
        this.name = fieldName;
        this.text = this.fieldEl.getAttribute('text') || this.fieldEl.innerHTML || '';
        this.type = this.fieldEl.getAttribute('type');
        this.validator = this.fieldEl.getAttribute('validator');
        this.value = this.fieldEl.getAttribute('value');
        this.bind = this.fieldEl.getAttribute('bind');
        this.sortable = this.fieldEl.getAttribute('sortable') || false;
        this.widget = this.fieldEl.getAttribute('widget');
        this.format = this.fieldEl.getAttribute('format');
        this.placeholder = this.fieldEl.getAttribute('placeholder');
        this.limit = this.fieldEl.getAttribute('limit') ? parseInt(this.fieldEl.getAttribute('limit')) : false;
        this.icon = this.fieldEl.getAttribute('icon');
        this.alias = this.fieldEl.getAttribute('alias');
        this.objProperty = this.fieldEl.getAttribute('obj-property');
        this.watch = this.fieldEl.getAttribute('watch');
        this.disableLabel =  this.fieldEl.getAttribute('disable-label') == 'true';
        this.symbol = this.fieldEl.getAttribute('symbol') || '';
        return this;
    }

    getFields() {
        if (this.fields) {
            return this.fields;
        } else if (this.fieldEl){
            const fields = this.fieldEl.querySelectorAll(':scope > field');
            this.fields = Array.from(fields).map((field) => {
                return this.builder.getField(this.fieldEl, field.getAttribute('name'));
            });
            return this.fields;    
        }
    }

    getForm() {
        if (this.form) {
            return this.form;
        } else {
            if (this.fieldEl) {
                const formEl = this.fieldEl.closest('form');
                return this.builder.getForm(formEl.getAttribute('name'));        
            }
        }
    }

    getLabel() {
        this.label = null;
        if (this.fieldEl) {
            const label = this.fieldEl.querySelector(':scope > label');
            if (label) {
                this.label = this.builder.getLabel(this.fieldEl);
            }
            return this.label;    
        }
    }

    getDefault() {
        return null;
    }

} 