import { BaseElement } from './index';

export default class Group extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, groupName) { 
        this.groupEl = parentEl.querySelector(`group[name=${groupName}]`);
        this.parentEl = parentEl;
        this.name = groupName;
        this.text = this.groupEl.getAttribute('text');
        return this;
    }

    getFields() {
        const fields = this.groupEl.querySelectorAll('fields > field');
        console.log(fields);
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.groupEl, field.getAttribute('name'));
        });
        return this.fields;
    }
    getTitle() {
        const title = this.groupEl.getAttribute('title');
        return title;
    }

} 