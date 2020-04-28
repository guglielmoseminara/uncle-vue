import {
    ApiRest, 
    Api,
} from './index';

import { BaseBuilder } from '../../index'; 

export default class ApiBuilder extends BaseBuilder {

    getApi(mainEl, apiName) {
        const api = this.parser.getApi(apiName);
        if (api) {
            const type = this.parser.getAttribute(api, 'type');
            if (type == 'rest') {
                return new ApiRest();    
            }
        } 
        return new Api();
    }

}