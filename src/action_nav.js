import { Action } from './index';

export default class ActionNav extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        this.appEl = this.actionEl.closest('app');
        this.route = this.builder.getRoute(this.appEl, this.actionEl.getAttribute('route'));
        return this;
    }

    executeChild(params = null) {
        this.serviceManager.getRouter().navigate(this.route.name, params);
        return true;
    }
    
}