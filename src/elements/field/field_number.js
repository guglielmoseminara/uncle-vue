import { Field } from './index';

export default class FieldNumber extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.minEl = this.parser.getElementRangeMin(this.fieldEl);
        if (this.minEl) {
            this.min = this.parser.getAttribute(this.minEl, 'value') || 0;
            this.minAction = this.parser.getAttribute(this.minEl, 'action');
        } else {
            this.min = 0;
            this.minAction = null;
        }
        this.maxEl = this.parser.getElementRangeMax(this.fieldEl);
        if (this.maxEl) {
            this.max = this.parser.getAttribute(this.maxEl, 'value') || 0;
            this.maxAction = this.parser.getAttribute(this.maxEl, 'action');
        } else {
            this.max = 0;
            this.maxAction = null;
        }        
        return this;
    }
    
}