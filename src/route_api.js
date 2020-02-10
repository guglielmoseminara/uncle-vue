import { Route } from './index';

export default class RouteApi extends Route {

    constructor() {
        super();
    }

    build(parentEl, routeName) {
        super.build(parentEl, routeName);
        this.apiEl = this.routeEl.closest('api');
        this.response = this.routeEl.getAttribute('response') ? this.builder.getResponse(this.apiEl, this.routeEl.getAttribute('response')) : this.builder.getResponse(this.apiEl);
        return this;
    }

}