import { Action } from './index';

export default class ActionNav extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        this.appEl = this.parser.getParentApp(this.actionEl, 'app');
        this.route = this.builder.getRoute(this.appEl, this.parser.getAttribute(this.actionEl, 'route'));
        return this;
    }

    executeChild(params = {}) {
        this.serviceManager.getRouter().navigate(this.route.name, params);
        return true;
    }
    
}