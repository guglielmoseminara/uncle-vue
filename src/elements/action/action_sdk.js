import { Action } from './index';
import { Utils } from '../../index';
import jexl from 'jexl';

export default class ActionSdk extends Action { 

    constructor() {
        super();
    }

    build(actionName) {
        super.build(actionName);
        this.method = this.builder.getMethod(this.parser.getAttribute(this.actionEl, 'method'));
        this.api = this.builder.getApi(this.method.api);
        this.store = this.parser.getAttribute(this.actionEl, 'store');
        this.filterParams = this.parser.getAttribute(this.actionEl, 'filter-params');
        this.request = null;
        return this;
    }

    setRequestParams(request) {
        this.request = request; 
    }

    async executeChild(params = {}) {
        const sdk = this.builder.getSdk();
        params = this._filterParams(params);
        params = this._buildParams(params);
        params = await this._checkConditions(params);
        const result = await sdk.execute(this.api, this.method, params);
        const stateManager = this.serviceManager.getStateManager();
        stateManager.set(this.store, result);
        return result;
    }

    _filterParams(params) {
        if (this.filterParams) {
            const paramsNames = this.getParams().map((param) => {
                return param.name;
            });
            params = Object.keys(params).reduce((newParams, paramName) => {
                console.log(paramName, paramsNames.indexOf(paramName));
                if (paramsNames.indexOf(paramName) !== -1) {
                    newParams[paramName] = params[paramName];
                }
                return newParams;
            }, {});
            console.log(params);
        }
        return params;
    }

    _buildParams(params) {
        if (typeof window !== 'undefined') {
            var encode = false;
            if (this.request instanceof FormData) {
                encode = true;
            }    
            params = this._buildParamsDecoded(params, this._decodeRequest(this.request));
            if (encode) {
                params = Utils.encodeFormData(params);
            }
        } else {
            params = this._buildParamsDecoded(params, this.request);
        }
        return params;
    }

    _buildParamsDecoded(params, request) {
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