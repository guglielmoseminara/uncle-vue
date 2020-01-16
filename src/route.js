import { BaseElement } from './index';

export default class Route extends BaseElement {

    constructor() {
        super();
    }

    build(parentEl, routeName) {
        this.routeEl = parentEl.querySelector(`routes > route[name="${routeName}"]`);
        this.url = this.routeEl.getAttribute('url');
        this.method = this.routeEl.getAttribute('method');
        this.request = this.routeEl.getAttribute('request') ? this.builder.getRequest(this.routeEl.getAttribute('request')) : null;
        this.name = routeName;
        this.view = this.builder.getView(this.routeEl.getAttribute('view'));
        this.action = this.routeEl.getAttribute('action') ? this.builder.getAction(this.routeEl.getAttribute('action')) : null;
        return this;
    }

    getRoutes() {
        const routes = this.routeEl.querySelectorAll(':scope > routes > route');
        this.routes = Array.from(routes).map((route) => {
            return this.builder.getRoute(this.routeEl, route.getAttribute('name'));
        });
        return this.routes;
    }
}