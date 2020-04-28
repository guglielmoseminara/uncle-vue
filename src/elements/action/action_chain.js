import { Action } from './index';

export default class ActionList extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        const actions = this.parser.getElementActions(this.actionEl);
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getAction(action.getAttribute('name'));
        });
        return this;
    }

    async executeChild(params = null) {
        var actionParams = params;
        const innerActions = this.parser.getElementActions(this.actionEl);
        var executeResult = true;
        for (let i = 0; i < this.actions.length; i++) {
            let innerParams = this.getParams(innerActions[i]);
            actionParams = {...actionParams, ...this.paramsManager.buildParams(innerParams, actionParams)};
            executeResult = await this.actions[i].execute(actionParams);
            actionParams = executeResult;
        }
        return executeResult;
    }

    getParams(actionEl) {
        const params = this.parser.getElementParams(actionEl);
        return Array.from(params).map((param) => {
            return {
                name: this.parser.getAttribute(param, 'name'),
                bind: this.parser.getAttribute(param, 'bind'),
                value: this.parser.getAttribute(param, 'value'),
            }
        });
    }

}