import { Action } from './index';

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

    getParams() {
        const params = this.actionEl.querySelectorAll('params param');
        return Array.from(params).map((param) => {
            return {
                name: param.getAttribute('name'),
                bind: param.getAttribute('bind'),
                value: param.getAttribute('value'),
            }
        });
    }

    setRequestParams(request) {
        this.request = request; 
    }

    async execute() {
        const sdk = this.builder.getSdk();
        return await sdk.execute(this.api, this.method, this.request);
    }

}