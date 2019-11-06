import { Field } from './index';

export default class ActionListField extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.text = '';
        return this;
    }

    getActions() {
        const actions = this.fieldEl.querySelectorAll('actions action-item');
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getActionItem(this.fieldEl, action.getAttribute('name'));
        });
        return this.actions;
    }

}