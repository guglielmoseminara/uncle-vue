import { Action } from './index';

export default class ActionService extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        this.method = this.actionEl.getAttribute('method');
        this.service = this.actionEl.getAttribute('service');
        return this;
    }

    executeChild(params = null) {
        const service = this.serviceManager.getService(this.service);
        service[this.method](params);
        return true;
    }

}