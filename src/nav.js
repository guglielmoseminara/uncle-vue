import { BaseElement } from './index';

export default class Nav extends BaseElement { 

    constructor() {
        super();
    }

    build(navName) {
        this.navEl = this.mainEl.querySelector(`navs nav[name="${navName}"]`);
        const navItemEls = this.navEl.querySelectorAll('nav-item');
        this.navItems = Array.from(navItemEls).map((navItem) => {
            return this.builder.getNavItem(this.navEl, navItem.getAttribute('name'));
        }); 
        return this;
    }
}
