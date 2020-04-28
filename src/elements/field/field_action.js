import { Field } from './index';

export default class FieldAction extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.action = this.builder.getAction(this.parser.getAttribute(this.fieldEl, 'action'));
        this.actionText = this.parser.getAttribute(this.fieldEl, 'action-text') || '';
        this.color = this.parser.getAttribute(this.fieldEl, 'color');
        return this;
    }

}