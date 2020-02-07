import { Field } from './index';

export default class FieldAction extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.action = this.builder.getAction(this.fieldEl.getAttribute('action'));
        this.actionText = this.fieldEl.getAttribute('action-text') || '';
        this.color = this.fieldEl.getAttribute('color');
        return this;
    }

}