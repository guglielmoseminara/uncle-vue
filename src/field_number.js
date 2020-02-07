import { Field } from './index';

export default class FieldNumber extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.minEl = this.fieldEl.querySelector('range min');
        if (this.minEl) {
            this.min = this.minEl.getAttribute('value') || 0;
            this.minAction = this.minEl.getAttribute('action');
        } else {
            this.min = 0;
            this.minAction = null;
        }
        this.maxEl = this.fieldEl.querySelector('range max');
        if (this.maxEl) {
            this.max = this.maxEl.getAttribute('value') || 0;
            this.maxAction = this.maxEl.getAttribute('action');
        } else {
            this.max = 0;
            this.maxAction = null;
        }        
        return this;
    }
    
}