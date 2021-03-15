import { BaseElement } from '../../index';

export default class Nav extends BaseElement { 

    constructor() {
        super();
    }

    build(navName) {
        this.navEl = this.parser.getNav(navName);
        const navItemEls = this.parser.getElementNavItemsOrGrouped(this.navEl);
        this.navItems = Array.from(navItemEls).map((navItem) => {
            return this.builder.getNavItem(this.navEl, this.parser.getAttribute(navItem, 'name'));
        }).sort((navItem) => {
            if (navItem.sortOrder) {
                return -parseInt(navItem.sortOrder);
            } else {
                return 1;
            }
        });
        return this;
    }

    getGroups() {
        const groups = this.parser.getElementGroups(this.navEl);
        this.groups = Array.from(groups).map((group) => {
            return this.builder.getGroup(this.navEl, this.parser.getAttribute(group, 'name'));
        });
        return this.groups;
    }
}
