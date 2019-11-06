import { BaseElement } from './index';

export default class ActionItem extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, actionName) {
        this.actionItemEl = parentEl.querySelector(`actions action-item[name=${actionName}]`);
        this.parentEl = parentEl;
        this.name = actionName;
        this.text = this.actionItemEl.innerHTML;
        this.color = this.actionItemEl.getAttribute('color');
        this.icon = this.actionItemEl.getAttribute('icon');
        this.validate = this.actionItemEl.getAttribute('validate')?true:false;
        this.action = this.builder.getAction(this.actionItemEl.getAttribute('name'));
        return this;
    }

}