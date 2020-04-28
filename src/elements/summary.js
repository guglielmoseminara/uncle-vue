import { BaseElement } from '../index';

export default class Summary extends BaseElement { 

    constructor() {
        super();
    }

    build(summaryName) {
        this.name = summaryName;
        this.summaryEl = this.parser.getSummary(summaryName);
        return this;
    }

    getFields() {
        const fields = this.parser.getElementFields(this.summaryEl);
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.summaryEl, this.parser.getAttribute(field, 'name'));
        });
        return this.fields;
    }

    getGroups() {
        const groups = this.parser.getElementGroups(this.summaryEl);
        this.groups = Array.from(groups).map((group) => {
            return this.builder.getGroup(this.summaryEl, this.parser.getAttribute(group, 'name'));
        });
        return this.groups;
    }

    getActions() {
        const actions = this.parser.getElementActionItems(this.summaryEl);
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getActionItem(this.summaryEl, this.parser.getAttribute(action, 'name'));
        });
        return this.actions;
    }

    async getItem() {
        const item = this.parser.getElementItem(this.summaryEl);
        if (item && this.parser.getAttribute(item, 'action')) {
            const action = this.builder.getAction(this.parser.getAttribute(item, 'action'));
            const params = this.paramsManager.buildParams(action.getParams(), this.params);
            action.setRequestParams(params);
            const response = await action.execute();
            return response.getData();
        }
        return this;
    }

    setParams(params) {
        this.params = params;
        return this;
    }
}