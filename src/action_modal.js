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

    getModal() {
        return this.modal;
    }

}