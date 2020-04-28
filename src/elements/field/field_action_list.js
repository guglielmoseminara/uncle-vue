import { Field } from './index';

export default class FieldActionList extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.text = '';
        return this;
    }

    getActions() {
        const actions = this.parser.getElementActionItems(this.fieldEl, 'actions action-item');
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getActionItem(this.fieldEl, this.parser.getAttribute(action, 'name'));
        });
        return this.actions;
    }

}