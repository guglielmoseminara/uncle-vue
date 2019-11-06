import { BaseElement } from './index';
import DotObject from 'dot-object';

export default class Summary extends BaseElement { 

    constructor() {
        super();
    }

    build(summaryName) {
        this.summaryEl = this.mainEl.querySelector(`summaries summary[name="${summaryName}"]`);
        this.name = summaryName;
        return this;
    }

    getFields() {
        const fields = this.summaryEl.querySelectorAll('fields > field');
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.summaryEl, field.getAttribute('name'));
        });
        return this.fields;
    }

    getGroups() {
        const groups = this.summaryEl.querySelectorAll('group');
        this.groups = Array.from(groups).map((group) => {
            return this.builder.getGroup(this.summaryEl, group.getAttribute('name'));
        });
        return this.groups;
    }

    getActions() {
        const actions = this.summaryEl.querySelectorAll('actions action-item');
        this.actions = Array.from(actions).map((action) => {
            console.log(action.getAttribute('name'));
            return this.builder.getActionItem(this.summaryEl, action.getAttribute('name'));
        });
        return this.actions;
    }

    async getItem() {
        const item = this.summaryEl.querySelector('item');
        if (item.getAttribute('action')) {
            const action = this.builder.getAction(item.getAttribute('action'));
            const params = this.buildParams(action);
            action.setRequestParams(params);
            const response = await action.execute();
            return response.getData();
        }
        return this;
    }

    buildParams(action) {
        const params = action.getParams();
        var paramsObject = {};
        for (let p=0; p < params.length; p++) {
            let param = params[p];
            if (param.bind) {
                DotObject.copy(param.bind, param.name, this, paramsObject);
            } else if (param.value) {
                paramsObject[param.name] = param.value;
            }
        }
        return paramsObject;
    }

    setParams(params) {
        this.params = params;
        return this;
    }
}