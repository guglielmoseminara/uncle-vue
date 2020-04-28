import { Item } from './index';

export default class ItemAction extends Item {

    constructor() {
        super();
    }

    build(parentEl) {
        super.build(parentEl);
        this.parentEl = parentEl;
        this.valueField = this.parser.getAttribute(this.itemEl, 'value-field');
        this.textField = this.parser.getAttribute(this.itemEl, 'text-field');
        this.params = null;
        return this;
    }

    getAction() {
        return this.action ? this.action : this.builder.getAction(this.parser.getAttribute(this.itemEl, 'action'));
    }

    async getItems() {
        const action = this.getAction();
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