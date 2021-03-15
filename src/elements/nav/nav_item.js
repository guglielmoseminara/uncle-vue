import { BaseElement } from '../../index';

export default class NavItem extends BaseElement {

    constructor() {
        super();
    }

    build(navEl, navItemName) {
        this.name = navItemName;
        this.navItemEl = this.parser.getElementNavItem(navEl, navItemName);
        const languageProvider = this.serviceManager.getLanguageProvider();
        const routeAttribute = this.parser.getAttribute(this.navItemEl, 'route');
        const actionAttribute = this.parser.getAttribute(this.navItemEl, 'action');
        const textAttribute = this.parser.getAttribute(this.navItemEl, 'text');
        this.sortOrder = this.parser.getAttribute(this.navItemEl, 'sort-order');
        this.route = routeAttribute ? this.builder.getRoute(this.parser.getApp(), routeAttribute) : null;
        this.action = actionAttribute ? this.builder.getAction(actionAttribute) : null;
        this.text = textAttribute ? languageProvider.parse(textAttribute) : languageProvider.parse(this.parser.getElementText(this.navItemEl));
        this.icon = this.parser.getAttribute(this.navItemEl, 'icon');
        return this;
    }

    getNavItems() {
        const navItemEls = this.parser.getElementNavItems(this.navItemEl);
        
        this.navItems = Array.from(navItemEls).map((navItem) => {
            return this.builder.getNavItem(this.navItemEl, this.parser.getAttribute(navItem, 'name'));
        }).sort((navItem) => {
            if (navItem.sortOrder) {
                return -parseInt(navItem.sortOrder);
            } else {
                return 1;
            }
        });;
        return this.navItems;
    }
}