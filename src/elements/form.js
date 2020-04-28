import { BaseElement } from '../index';

export default class Form extends BaseElement { 

    constructor() {
        super();
    }

    build(formName) {
        this.name = formName;
        this.formEl = this.parser.getElementForm(this.mainEl, formName);
        this.title = this.parser.getAttribute(this.formEl, 'title');
        const actionAttribute = this.parser.getAttribute(this.formEl, 'action');
        const validatorServiceAttribute = this.parser.getAttribute(this.formEl, 'validator-service');
        this.action = actionAttribute ? this.builder.getAction(actionAttribute) : null;
        this.validatorService = validatorServiceAttribute ? this.serviceManager.getService(validatorServiceAttribute) : null;
        return this;
    }

    getFields() {
        const fields = this.parser.getElementFieldsOrGrouped(this.formEl);
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.formEl, this.parser.getAttribute(field, 'name'));
        });
        return this.fields;
    }

    getGroups() {
        const groups = this.parser.getElementGroups(this.formEl);
        this.groups = Array.from(groups).map((group) => {
            return this.builder.getGroup(this.formEl, this.parser.getAttribute(group, 'name'));
        });
        return this.groups;
    }

    getActions() {
        const actions = this.parser.getElementActionItems(this.formEl);
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getActionItem(this.formEl, this.parser.getAttribute(action, 'name'));
        });
        return this.actions;
    }

    async getItem() {
        const item = this.parser.getElementItem(this.formEl);
        if (item && this.parser.getAttribute(item, 'action')) {
            const action = this.builder.getAction(this.parser.getAttribute(item, 'action'));
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
        return Array.from(this.parser.getElementChildren(this.formEl)).map((child) => {
            const elementName = this.parser.getElementName(child);
            if (elementName == 'actions') {
                return {tagName:'actions', element:this.getActions()};
            } else if (elementName == 'item') {
                return {tagName:'item'};
            } else if (elementName == 'groups') {
                return {tagName:'groups', element:this.getGroups()};
            } else if (elementName == 'fields') {
                return {tagName:'fields', element:this.getFields()};
            } else {
                return {tagName:elementName, element:this.builder.build(elementName, this.parser.getAttribute(child, 'name'))};
            }
        });
    }
}