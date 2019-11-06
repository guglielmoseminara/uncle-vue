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

    getParams() {
        const params = this.actionEl.querySelectorAll('params param');
        return Array.from(params).map((param) => {
            return {
                name: param.getAttribute('name')
            }
        });
    }

}