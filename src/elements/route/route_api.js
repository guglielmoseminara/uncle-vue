import { Route } from './index';

export default class RouteApi extends Route {

    constructor() {
        super();
    }

    build(parentEl, routeName) {
        super.build(parentEl, routeName);
        const responseAttribute = this.parser.getAttribute(this.routeEl, 'response');
        const apiEl = this.parser.getParentApi(parentEl);
        this.response = responseAttribute ? this.builder.getResponse(apiEl, responseAttribute) : this.builder.getResponse(apiEl);
        return this;
    }

}