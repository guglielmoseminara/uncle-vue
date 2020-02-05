import { BaseElement } from './index';
import jexl from 'jexl';

export default class Action extends BaseElement { 

    constructor() {
        super();
    }

    build(actionName) {
        this.actionEl = this.mainEl.querySelector(`actions > action[name='${actionName}']`);
        this.name = actionName;
        this.confirm = this.actionEl.getAttribute('confirm') == 'true' || undefined;
        this.type = this.actionEl.getAttribute('type');
        this.after = this.actionEl.getAttribute('after') ? this.builder.getAction(this.actionEl.getAttribute('after')) : null;
        return this;
    }

    getParams() {
        const params = this.actionEl.querySelectorAll(':scope > params > param');
        return Array.from(params).map((param) => {
            return {
                name: param.getAttribute('name'),
                bind: param.getAttribute('bind'),
                value: param.getAttribute('value'),
            }
        });
    }

    getCases() {
        return Array.from(this.actionEl.querySelectorAll('case')).map((caseItem) => {
            return {
                when: caseItem.getAttribute('when'),
                action: this.builder.getAction(caseItem.getAttribute('action'))
            }
        });
    }

    getConditions() {
        return Array.from(this.actionEl.querySelectorAll('condition')).map((conditionItem) => {
            return {
                when: conditionItem.getAttribute('when'),
                action: this.builder.getAction(conditionItem.getAttribute('action'))
            }
        });
    }

    async execute(params = {}) {
        const executeResult = await this.executeChild(params);
        const relatedResult = await this._executeRelated(executeResult);
        return relatedResult ? relatedResult : executeResult;
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