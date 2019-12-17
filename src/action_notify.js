import { Action } from './index';

export default class ActionNav extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        this.text = this.actionEl.getAttribute('text');
        this.state = this.actionEl.getAttribute('state');
        return this;
    }

    executeChild(params = null) {
        const notifier = this.serviceManager.getNotifier();
        notifier[this.state](this.text);
        return true;
    }

}