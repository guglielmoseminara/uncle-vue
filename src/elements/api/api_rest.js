import { Http, Utils } from '../../index';
import { Api } from './index';
import DotObject from 'dot-object';
import _ from 'lodash';

export default class ApiRest extends Api {

    constructor() {
        super();
        this.http = new Http();
    }

    build(apiName) {
        super.build(apiName);
        return this;
    }

    async execute() {
        const resource = this.parser.getApiResource(this.apiEl, this.method.resource);
        const resourceRoute = this.parser.getResourceRoute(resource, this.method.route);
        const route = this.builder.getRouteApi(resource, this.parser.getAttribute(resourceRoute, 'name'));
        const replacedUrlObj = this._replaceUrlVariables(route.url);
        const data = this._buildData(route, replacedUrlObj.replacedParams);
        const headers = this._buildHeaders(route);
        const response = await this.http[route.method](this._buildUrl(route, replacedUrlObj), data, headers, route.response.type);
        return route.response ? route.response.format(response) : response;
    }

    _buildData(route, replacedParams) {
        var request = this.request;
        var encode = false;
        if (typeof window !== 'undefined') {
            if (request instanceof FormData) {
                request = Utils.decodeFormData(request);
                encode = true;
            }
            var data = route.method == 'get' ? {} : this._remap(_.omit(request, replacedParams));
            if (encode) {
                data = Utils.encodeFormData(data);
            }    
        } else {
            var data = route.method == 'get' ? {} : _.omit(request, replacedParams);
        }
        return data;
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
                item[lastPart] = this._buildFieldRequest(this.request[k], k);
                if (!previous[keyArr[0]]) {
                    previous[keyArr[0]] = {};
                }
                previous[keyArr[0]] = {...previous[keyArr[0]], ...item};
            } else {
                let item = {}
                item[k] = this._buildFieldRequest(this.request[k], k);
                previous = {...previous, ...item};
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

    _getLastNestedValue(o) { 
        return Object.keys(o).reduce(function (r, k) { 
          return typeof o[k] === 'object' ? this._getLastNestedValue(o[k]) : (r[k] = o[k], r) 
        }.bind(this), {});
    }

    _getkeys(obj, prefix){
        var keys = Object.keys(obj);
        prefix = prefix ? prefix + '.' : '';
        return keys.reduce(function(result, key){
            if(Object.prototype.toString.call(obj[key]) === '[object Object]'){
                result = result.concat(this._getkeys(obj[key], prefix + key));
            }else{
                result.push(prefix + key);
            }
            return result;
        }.bind(this), []);
    };

    _buildFieldRequest(field, key) {
        var value = field;
        if (Array.isArray(field)) {
            value = field.join('|');
        }
        else if (typeof field == 'object') {
            if (field.type && field.type == 'range') {
                value = field.min + '-'+field.max;
            } else if (field.type && field.type == 'price_range') {
                value = (parseInt(field.min)*100) + '-' + (parseInt(field.max)*100);
            } else {
                const keys = this._getkeys(field);
                value = {};
                for (let i in keys) {
                    let key = keys[i];
                    let picked = DotObject.pick(key, field);
                    if (Array.isArray(picked)) {
                        value[key] = picked.join('|');
                    } else {
                        value[key] = picked;
                    }
                }    
            }
        } 
        return value;
    }

    _replaceUrlVariables(url) {
        let replacedParams = [];
        var request = this.request;
        if (typeof window !== 'undefined') {
            if (request instanceof FormData) {
                request = Utils.decodeFormData(request);
            }
        }
        for (let reqParam in request) {
            if (url.indexOf(`{${reqParam}}`) != -1) {
                replacedParams.push(reqParam);
            }
            url = url.replace(`{${reqParam}}`, request[reqParam]);
        }
        return {
            url: url,
            replacedParams: replacedParams,
        };
    }

    _buildHeaders(route) {
        if (route.request) {
            const headers = route.request.getHeaders();
            return Array.from(headers).reduce((obj, header) => { 
                if (this.request[header.name] || this.request[header.bind]) {
                    let requestParamName = header.name;
                    if (this.request[header.bind]) {
                        requestParamName = header.bind;
                    }
                    let requestParam = this.request[requestParamName];
                    if (header.type == 'bearer') {
                        obj[header.name] = 'Bearer ' + requestParam;
                    } else {
                        obj[header.name] = requestParam;
                    }
                    delete this.request[requestParamName];
                } else {
                    obj[header.name] = '';
                }
                return obj;
            }, {});    
        } else {
            return {};
        }
    }

    _remap(obj){
        return Object.keys(obj).reduce((newObject, key) => {{
            var newKey = key.replace(/\.(\w+)/, '[$1]');
            newObject[newKey] = obj[key];
            if(_.isObject(newObject[newKey])){
                newObject[newKey] = this._remap(newObject[newKey]);
            }
            return newObject;
        }}, {});
      }
}