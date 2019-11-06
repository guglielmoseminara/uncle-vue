import { BaseElement } from './index';
import DotObject from 'dot-object';

export default class Form extends BaseElement { 

    constructor() {
        super();
    }

    build(formName) {
        this.formEl = this.mainEl.querySelector(`forms form[name="${formName}"]`);
        this.name = formName;
        this.title = this.formEl.getAttribute('title');
        return this;
    }

    getFields() {
        const fields = this.formEl.querySelectorAll('fields field');
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.formEl, field.getAttribute('name'));
        });
        return this.fields;
    }

    getGroups() {
        const groups = this.formEl.querySelectorAll('group');
        this.groups = Array.from(groups).map((group) => {
            return this.builder.getGroup(this.formEl, group.getAttribute('name'));
        });
        return this.groups;
    }

    getActions() {
        const actions = this.formEl.querySelectorAll('actions action-item');
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getActionItem(this.formEl, action.getAttribute('name'));
        });
        return this.actions;
    }

    async getItem() {
        const item = this.formEl.querySelector('item');
        if (item && item.getAttribute('action')) {
            const action = this.builder.getAction(item.getAttribute('action'));
            const params = this.buildParams(action);
            action.setRequestParams(params);
            const response = await action.execute();
            return response.getData();
        }
        return null;
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