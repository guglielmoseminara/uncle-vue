import { Field } from './index';

export default class FieldCustom extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.component = this.parser.getAttribute(this.fieldEl, 'component');
        return this;
    }
    
}