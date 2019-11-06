import { Api, Http } from './index';
import DotObject from 'dot-object';
import _ from 'lodash';

export default class RestApi extends Api {

    constructor() {
        super();
        this.http = new Http();
    }

    build(apiName) {
        super.build(apiName);
        return this;
    }

    async execute() {
        const resource = this.apiEl.querySelector(`resources resource[name='${this.method.resource}']`);
        const route = this.builder.getRoute(resource, resource.querySelector(`routes route[name='${this.method.route}']`).getAttribute('name'));
        const replacedUrlObj = this._replaceUrlVariables(route.url);
        const data = route.method == 'get' ? {} : _.omit(this.request, replacedUrlObj.replacedParams);
        const response = await this.http[route.method](this._buildUrl(route, replacedUrlObj), data);
        return this.response ? this.response.format(response) : response;
    }

    _buildUrl(route, replacedUrlObj) {
        const queryString = route.method == 'get' ? this._buildQueryString(replacedUrlObj.replacedParams) : '';
        return this.baseUrl + replacedUrlObj.url + ( queryString ? '?' + queryString : '' );
    }

    _buildQueryString(replacedParams = []) {
        const params = Object.keys(this.request).reduce((previous, k) => {
            const keyArr = k.split('.');
            const lastPart = keyArr.slice(1, keyArr.length).join('.');
            if (keyArr.length > 1) {
                let item = {};
                item[lastPart] = this.request[k];
                previous[keyArr[0]] = item;
            } else {
                if (typeof this.request[k] == 'object') {
                    previous[k] = DotObject.dot(this.request[k]);
                } else {
                    previous[k] = this.request[k];
                }
            }
            return previous;
        }, {});
        const queryString = Object.keys(params).map((paramKey) => {
            if (replacedParams.indexOf(paramKey) != -1 ) {
                return '';
            }
            return typeof params[paramKey] === 'object' ?
                paramKey + '=' + Object.keys(params[paramKey]).map((subParamKey) => {
                    return typeof params[paramKey][subParamKey] === 'boolean' ?
                            (subParamKey + ':' + (params[paramKey][subParamKey]?1:0)) :
                            (subParamKey + ':' + (params[paramKey][subParamKey]))
                }).join(';') :
                typeof params[paramKey] === 'boolean' ?
                paramKey + '=' + (params[paramKey]?1:0) :
                paramKey + '=' + params[paramKey];
        }).join('&');
        return queryString;
    }

    _replaceUrlVariables(url) {
        let replacedParams = [];
        for (let reqParam in this.request) {
            if (url.indexOf(`{${reqParam}}`) != -1) {
                replacedParams.push(reqParam);
            }
            url = url.replace(`{${reqParam}}`, this.request[reqParam]);
        }
        return {
            url: url,
            replacedParams: replacedParams,
        };
    }
}