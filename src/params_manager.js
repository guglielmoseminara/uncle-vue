import DotObject from 'dot-object';

export default class ParamsManager {

    constructor(serviceManager) {
        this.serviceManager = serviceManager;
    }

    buildParams(params, requestParams) {
        var context = {
            requestParams: requestParams,
            serviceManager: this.serviceManager
        }
        var paramsObject = {};
        for (let p=0; p < params.length; p++) {
            let param = params[p];
            if (param.bind) {
                let val = DotObject.pick(param.bind, context);
                if (val) {
                    paramsObject[param.name] = val;
                }
            } else if (param.value) {
                paramsObject[param.name] = param.value;
            }
        }
        return paramsObject;
    }
}