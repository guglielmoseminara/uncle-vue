import DotObject from 'dot-object';
import { Item } from './index';

export default class ItemAction extends Item {

    constructor() {
        super();
    }

    build(parentEl) {
        super.build(parentEl);
        this.parentEl = parentEl;
        this.valueField = this.itemEl.getAttribute('value-field');
        this.textField = this.itemEl.getAttribute('text-field');
        return this;
    }

    async getItems() {
        const action = this.builder.getAction(this.itemEl.getAttribute('action'));
        const params = this.paramsManager.buildParams(action.getParams(), this.params);
        action.setRequestParams(params);
        const response = await action.execute();
        return response;
    }

    setParams(params) {
        this.params = params;
        return this;
    }

}