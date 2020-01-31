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
        this.action = this.formEl.getAttribute('action') ? this.builder.getAction(this.formEl.getAttribute('action')) : null;
        return this;
    }

    getFields() {
        const fields = this.formEl.querySelectorAll('fields > field');
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
            const params = this.paramsManager.buildParams(action.getParams(), this.params);
            action.setRequestParams(params);
            const response = await action.execute();
            return response.getData();
        }
        return null;
    }

    setParams(params) {
        this.params = params;
        return this;
    }

    parse() {
        return Array.from(this.formEl.children).map((child) => {
            if (child.tagName == 'actions') {
                return {tagName:'actions', element:this.getActions()};
            } else if (child.tagName == 'item') {
                return {tagName:'item'};
            } else if (child.tagName == 'groups') {
                return {tagName:'groups', element:this.getGroups()};
            } else if (child.tagName == 'fields') {
                return {tagName:'fields', element:this.getFields()};
            } else {
                return {tagName:child.tagName, element:this.builder.build(child.tagName, child.getAttribute('name'))};
            }
        });
    }
}