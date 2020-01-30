import { Action } from './index';

export default class ActionModal extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        this.modal = this.builder.getModal(this.actionEl.getAttribute('modal'));
        return this;
    }

    executeChild(params = null) { 
        this.serviceManager.getModal().open(this.modal.name, params);
        return true;
    }

    getModal() {
        return this.modal;
    }

}