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
        this.layout = this.groupEl.getAttribute('layout');
        this.visible = this.groupEl.getAttribute('visible') || true;
        return this;
    }

    getFields() {
        const fields = this.groupEl.querySelectorAll(':scope > fields > field');
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.groupEl, field.getAttribute('name'));
        });
        return this.fields;
    }

} 