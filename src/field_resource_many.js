import { FieldResource } from './index';

export default class FieldResourceMany extends FieldResource { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.modal = this.fieldEl.getAttribute('modal') ? this.builder.getModal(this.fieldEl.getAttribute('modal')) : null;
        this.max = this.fieldEl.getAttribute('max');
        return this;
    }
    
}