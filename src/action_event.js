import { Action } from './index';

export default class ActionEvent extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        return this;
    }

    executeChild(params = null) {
        const eventEmitter = this.serviceManager.getEventEmitter();
        eventEmitter.$emit(this.name, params);
        return true;
    }

}