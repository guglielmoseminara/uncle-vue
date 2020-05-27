import { BaseElement } from '../../index';
import jexl from 'jexl';

export default class ActionItem extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, actionName) {
        this.parentEl = parentEl;
        this.name = actionName;
        this.actionItemEl = this.parser.getElementActionItem(parentEl, actionName);
        this.text = this.parser.getElementText(this.actionItemEl);
        this.color = this.parser.getAttribute(this.actionItemEl, 'color');
        this.icon = this.parser.getAttribute(this.actionItemEl, 'icon');
        this.confirm = this.parser.getAttribute(this.actionItemEl, 'confirm') == 'true';
        this.validate = this.parser.getAttribute(this.actionItemEl, 'validate') ? true : false ;
        this.hidden = this.parser.getAttribute(this.actionItemEl, 'hidden');
        this.action = this.builder.getAction(this.parser.getAttribute(this.actionItemEl, 'name'));
        const submitAttribute = this.parser.getAttribute(this.actionItemEl, 'submit');
        this.submit = !submitAttribute || submitAttribute != 'false';
        return this;
    }

    getForm() {
        const formEl = this.parser.getParentForm(this.actionItemEl);
        const formName = this.parser.getAttribute(formEl, 'name');
        return this.builder.getForm(formName);
    }

    async isHidden(context) {
        var conditionResult = false;
        try {
            conditionResult = await jexl.eval(this.hidden, context);
        } catch(e) {
            conditionResult = false;
        }
        return conditionResult;
    }

}