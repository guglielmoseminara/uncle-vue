import { Field } from './index';

export default class FieldGeoAddress extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.addressField = this.parser.getAttribute(this.fieldEl, 'address-field');
        this.coordsField = this.parser.getAttribute(this.fieldEl, 'coords-field');
        return this;
    }
    
}