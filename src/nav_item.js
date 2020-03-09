import { BaseElement } from './index';

export default class NavItem extends BaseElement {

    constructor() {
        super();
    }

    build(navEl, navItemName) {
        this.navItemEl = navEl.querySelector(`nav-item[name="${navItemName}"]`);
        const languageProvider = this.serviceManager.getLanguageProvider();
        this.appEl = this.navItemEl.closest('app');
        this.route = this.navItemEl.getAttribute('route') ? this.builder.getRoute(this.appEl, this.navItemEl.getAttribute('route')) : null;
        this.action = this.navItemEl.getAttribute('action') ? this.builder.getAction(this.navItemEl.getAttribute('action')) : null;
        this.text = this.navItemEl.getAttribute('text') ? languageProvider.parse(this.navItemEl.getAttribute('text')) : languageProvider.parse(this.navItemEl.innerHTML);
        this.icon = this.navItemEl.getAttribute('icon');
        this.name = navItemName;
        return this;
    }

    getNavItems() {
        const navItemEls = this.navItemEl.querySelectorAll(':scope > nav-item');
        this.navItems = Array.from(navItemEls).map((navItem) => {
            return this.builder.getNavItem(this.navItemEl, navItem.getAttribute('name'));
        });
        return this.navItems;
    }
}