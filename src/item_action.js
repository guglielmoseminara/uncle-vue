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
        const params = this.buildRequestParams(action);
        action.setRequestParams(params);
        const response = await action.execute();
        return response;
    }

    setParams(params) {
        this.params = params;
        return this;
    }

    buildRequestParams(action) {
        const params = action.getParams();
        var paramsObject = {};
        for (let p=0; p < params.length; p++) {
            let param = params[p];
            if (param.bind) {
                DotObject.copy(param.bind, param.name, this.params, paramsObject);
            } else if (param.value) {
                paramsObject[param.name] = param.value;
            }
        }
        return paramsObject;
    }

}