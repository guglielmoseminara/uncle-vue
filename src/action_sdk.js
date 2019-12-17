import { Action, Utils } from './index';

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
        return await sdk.execute(this.api, this.method, params);
    }

    _buildParams(params) {
        var request = this.request;
        var encode = false;
        if (request instanceof FormData) {
            request = Utils.decodeFormData(request);
            encode = true;
        }
        params = {...params, ...request}
        params = {...params, ...this.paramsManager.buildParams(this.getParams(), params)}
        if (encode) {
            params = Utils.encodeFormData(params);
        }
        return params;
    }

}