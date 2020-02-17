import DotObject from 'dot-object';

export default class ParamsManager {

    constructor(serviceManager) {
        this.serviceManager = serviceManager;
    }

    buildContext(requestParams) {
        var context = {...requestParams};
        context.serviceManager = this.serviceManager;
        return context;
    }

    buildParams(params, requestParams) {
        var context = this.buildContext(requestParams);
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
            if (param.type == 'range' || param.type == 'price_range') {
                let value = paramsObject[param.name];
                if (value && value.length == 2) {
                    paramsObject[param.name] = {
                        type: param.type,
                        min: value[0],
                        max: value[1]
                    };    
                }
            }
        }
        return paramsObject;
    }
}