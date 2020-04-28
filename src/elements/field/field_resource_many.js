import { FieldResource } from './index';

export default class FieldResourceMany extends FieldResource { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        const modalAttribute = this.parser.getAttribute(this.fieldEl, 'modal');
        this.modal = modalAttribute ? this.builder.getModal(modalAttribute) : null;
        this.max = this.parser.getAttribute(this.fieldEl, 'max');
        return this;
    }
    
}