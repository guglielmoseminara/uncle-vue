import { Field } from './index';

export default class FieldGeoAddress extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.addressField = this.fieldEl.getAttribute('address-field');
        this.coordsField = this.fieldEl.getAttribute('coords-field');
        return this;
    }
    
}