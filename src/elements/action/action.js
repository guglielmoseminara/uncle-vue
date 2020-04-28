import { BaseElement } from '../../index';

import jexl from 'jexl';

export default class Action extends BaseElement { 

    constructor() {
        super();
    }

    build(actionName) {
        this.name = actionName;
        this.actionEl = this.parser.getElementAction(this.parser.getApp(), actionName);
        this.confirm = this.parser.getAttribute(this.actionEl, 'confirm') == 'true' || undefined;
        this.type = this.parser.getAttribute(this.actionEl, 'type');
        const afterAttribute = this.parser.getAttribute(this.actionEl, 'after');
        this.after = afterAttribute ? this.builder.getAction(afterAttribute) : null;
        return this;
    }

    getParams() {
        const params = this.parser.getElementParams(this.actionEl);
        return Array.from(params).map((param) => {
            return {
                name: this.parser.getAttribute(param, 'name'),
                bind: this.parser.getAttribute(param, 'bind'),
                value: this.parser.getAttribute(param, 'value'),
                type: this.parser.getAttribute(param, 'type'),
                default: this.parser.getAttribute(param, 'default')
            }
        });
    }

    getCases() {
        return Array.from(this.parser.getActionCases(this.actionEl)).map((caseItem) => {
            let when = this.parser.getAttribute(caseItem, 'when');
            let action = this.parser.getAttribute(caseItem, 'action');
            return {
                when: when,
                action: this.builder.getAction(action)
            };
        });
    }

    getConditions() {
        return Array.from(this.parser.getActionConditions(this.actionEl, 'condition')).map((conditionItem) => {
            let when = this.parser.getAttribute(conditionItem, 'when');
            let action = this.parser.getAttribute(conditionItem, 'action');
            return {
                when: when,
                action: this.builder.getAction(action)
            }
        });
    }

    async execute(params = {}) {
        const executeResult = await this.executeChild(params);
        const relatedResult = await this._executeRelated(executeResult);
        return executeResult ? executeResult : relatedResult;
    }

    async _executeRelated(params) {
        var executeResult = null;
        const cases = this.getCases();
        if (cases.length > 0) {
            for (let c = 0; c < cases.length; c++) {
                let conditionResult = await jexl.eval(cases[c].when, params.get());
                if (conditionResult) {
                    executeResult = await cases[c].action.execute(params);
                    break;
                }
            }    
        }
        else if (this.after) {
            executeResult = await this.after.execute(params);
        }
        return executeResult;
    }


}