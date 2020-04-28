import { BaseElement } from '../../index';

export default class Route extends BaseElement {

    constructor() {
        super();
    }

    build(parentEl, routeName) {
        this.name = routeName;
        this.routeEl = this.parser.getElementRoute(parentEl, routeName);
        this.url = this.parser.getAttribute(this.routeEl, 'url');
        this.method = this.parser.getAttribute(this.routeEl, 'method');
        const requestAttribute = this.parser.getAttribute(this.routeEl, 'request');
        const viewAttribute = this.parser.getAttribute(this.routeEl, 'view');
        const actionAttribute = this.parser.getAttribute(this.routeEl, 'action');
        this.request = requestAttribute ? this.builder.getRequest(this.parser.getParentApi(parentEl), requestAttribute) : null;
        this.view = viewAttribute ? this.builder.getView(viewAttribute) : null;
        this.action = actionAttribute ? this.builder.getAction(actionAttribute) : null;
        this.breadcrumb = this.parser.getAttribute(this.routeEl, 'breadcrumb');
        return this;
    }

    getRoutes() {
        const routes = this.parser.getElementRoutes(this.routeEl);
        this.routes = Array.from(routes).map((route) => {
            return this.builder.getRoute(this.routeEl, this.parser.getAttribute(route, 'name'));
        });
        return this.routes;
    }
}