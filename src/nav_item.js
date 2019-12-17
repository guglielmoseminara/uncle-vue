import { BaseElement } from './index';

export default class NavItem extends BaseElement {

    constructor() {
        super();
    }

    build(navEl, navItemName) {
        this.navItemEl = navEl.querySelector(`nav-item[name="${navItemName}"]`);
        this.appEl = this.navItemEl.closest('app');
        this.route = this.navItemEl.getAttribute('route') ? this.builder.getRoute(this.appEl, this.navItemEl.getAttribute('route')) : null;
        this.action = this.navItemEl.getAttribute('action') ? this.builder.getAction(this.navItemEl.getAttribute('action')) : null;
        this.text = this.navItemEl.innerHTML;
        this.icon = this.navItemEl.getAttribute('icon');
        this.name = navItemName;
        return this;
    }
}