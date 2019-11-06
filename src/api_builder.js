import {
    RestApi, 
    Api,
} from './index';

export default class ApiBuilder {

    getApi(mainEl, apiName) {
        const api = mainEl.querySelector(`apis api[name='${apiName}']`);
        if (api) {
            const type = api.getAttribute('type');
            if (type == 'rest') {
                return new RestApi();    
            }
        } 
        return new Api();
    }

}