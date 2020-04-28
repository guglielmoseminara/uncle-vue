import { BaseElement } from '../index';

export default class Filter extends BaseElement { 

    constructor() {
        super();
    }

    build(filterName) {
        this.name = filterName;
        this.filterEl = this.parser.getElementFilter(this.mainEl, filterName);
        return this;
    }

    getFields() {
        const fields = this.parser.getElementFields(this.filterEl);
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.filterEl, this.parser.getAttribute(field, 'name'));
        });
        return this.fields;
    }

    getGroups() {
        const groups = this.parser.getElementGroups(this.filterEl);
        this.groups = Array.from(groups).map((group) => {
            return this.builder.getGroup(this.filterEl, this.parser.getAttribute(group, 'name'));
        });
        return this.groups;
    }

}
