import { Field } from './index';

export default class FieldDate extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        return this;
    }

    getValueFormatted(value) {
        return value ? this.momentManager(value, "YYYY-MM-DD").format(this.format) : null;
    }
    
}