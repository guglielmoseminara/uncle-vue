import { BaseElement } from '../index';

export default class Group extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, groupName) { 
        this.parentEl = parentEl;
        this.name = groupName;
        this.groupEl = this.parser.getElementGroup(parentEl, groupName);
        this.text = this.parser.getAttribute(this.groupEl, 'text');
        this.layout = this.parser.getAttribute(this.groupEl, 'layout');
        this.visible = this.parser.getAttribute(this.groupEl, 'visible') || true;
        return this;
    }

    getFields() {
        const fields = this.parser.getElementFields(this.groupEl);
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.groupEl, this.parser.getAttribute(field, 'name'));
        });
        return this.fields;
    }

    getNavItems() {
        const navItemEls = this.parser.getElementNavItems(this.groupEl);
        this.navItems = Array.from(navItemEls).map((navItem) => {
            return this.builder.getNavItem(this.groupEl, this.parser.getAttribute(navItem, 'name'));
        });
        return this.navItems;
    }

} 