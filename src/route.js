import { BaseElement } from './index';

export default class Route extends BaseElement {

    constructor() {
        super();
    }

    build(parentEl, routeName) {
        this.routeEl = parentEl.querySelector(`routes route[name="${routeName}"]`);
        this.url = this.routeEl.getAttribute('url');
        this.method = this.routeEl.getAttribute('method');
        this.request = this.builder.getRequest(this.routeEl.getAttribute('request'));
        this.name = routeName;
        this.view = this.builder.getView(this.routeEl.getAttribute('view'));
        return this;
    }
}