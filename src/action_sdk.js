import { Action, Utils } from './index';
import jexl from 'jexl';

export default class ActionSdk extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        this.method = this.builder.getMethod(this.actionEl.getAttribute('method'));
        this.api = this.builder.getApi(this.method.api);
        this.request = null;
        return this;
    }

    setRequestParams(request) {
        this.request = request; 
    }

    async executeChild(params = {}) {
        const sdk = this.builder.getSdk();
        params = this._buildParams(params);
        params = await this._checkConditions(params);
        return await sdk.execute(this.api, this.method, params);
    }

    _buildParams(params) {
        var request = this.request;
        var encode = false;
        if (request instanceof FormData) {
            request = Utils.decodeFormData(request);
            encode = true;
        }
        params = this._buildParamsDecoded(params);
        if (encode) {
            params = Utils.encodeFormData(params);
        }
        return params;
    }

    _buildParamsDecoded(params) {
        var request = this._decodeRequest(this.request);
        params = {...params, ...request}
        params = {...params, ...this.paramsManager.buildParams(this.getParams(), params)};
        return params;
    }

    async _checkConditions(params) {
        let executeResult = params;
        const conditions = this.getConditions();
        jexl.addTransform('isEmptyArray', function(array) {
            return !array || (array && array.length == 0);
        });
        if (conditions.length > 0) {
            let context = this._buildParamsDecoded(params);
            for (let c = 0; c < conditions.length; c++) {
                let when = conditions[c].when;
                let conditionResult = await jexl.eval(when, context);
                if (conditionResult) {
                    executeResult = await conditions[c].action.execute(params);
                    throw {message: 'Condition '+when+' verified'};
                    break;
                }
            }    
        }
        return executeResult;
    }

    _decodeRequest() {
        return this.request instanceof FormData ? Utils.decodeFormData(this.request) : this.request;
    }

}