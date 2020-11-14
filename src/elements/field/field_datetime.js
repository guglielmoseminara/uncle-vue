import { Field } from './index';

export default class FieldDateTime extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
    }

    getValueFormatted(value) {
        return this.format == 'hh:mm' ? this.momentManager().startOf('day').add(value, 'minutes').format('HH:mm') : value;
    }
    
}