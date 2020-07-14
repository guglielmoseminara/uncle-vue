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
        this._replaceName(params);
        eventEmitter.$emit(this.name, params);
        return true;
    }

    _replaceName(params = null) {
        var matches = this.name.match(/\{(.*?)\}/g);
        for (let match in matches) {
            let variable = matches[match].match(/\{(.*)\}/)[1];
            if (params && params[variable]) {
                this.name = this.name.replace(matches[match], params[variable]);
            }
        }
    }

}