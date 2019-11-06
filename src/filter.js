import { BaseElement } from './index';

export default class Filter extends BaseElement { 

    constructor() {
        super();
    }

    build(filterName) {
        this.filterEl = this.mainEl.querySelector(`filters filter[name="${filterName}"]`);
        this.name = filterName;
        return this;
    }

    getFields() {
        const fields = this.filterEl.querySelectorAll('fields field');
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.filterEl, field.getAttribute('name'));
        });
        return this.fields;
    }

    getGroups() {
        const groups = this.filterEl.querySelectorAll('group');
        this.groups = Array.from(groups).map((group) => {
            return this.builder.getGroup(this.filterEl, group.getAttribute('name'));
        });
        return this.groups;
    }

}
