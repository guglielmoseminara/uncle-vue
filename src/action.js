import { BaseElement } from './index';

export default class Action extends BaseElement { 

    constructor() {
        super();
    }

    build(actionName) {
        this.actionEl = this.mainEl.querySelector(`actions action[name=${actionName}]`);
        this.name = actionName;
        this.confirm = this.actionEl.getAttribute('confirm') == 'true' || undefined;
        this.type = this.actionEl.getAttribute('type');
        return this;
    }

    getParams() {
        return [];
    }

}