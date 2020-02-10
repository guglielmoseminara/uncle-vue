import axios from 'axios';

export default class Http { 

    async get(url, data = {}, headers = {}, responseType = null) {
        const config = this._buildConfig(headers, responseType);
        try {
            const res = await axios.get(url, config);
            return res.data;
        } catch (e) {
            return this._handleError(e);
        }
    }

    async put(url, data = {}, headers = {}, responseType = null) {
        const config = this._buildConfig(headers, responseType);
        config.params = {
            '_method': 'PUT'
        };
        try {
            let res = await axios.post(url, data, config);
            return res.data;
        } catch(e) {
            return this._handleError(e);
        }
    }

    async post(url, data = {}, headers = {}, responseType = null) {
        const config = this._buildConfig(headers, responseType);
        try {
            let res = await axios.post(url, data, config);
            return res.data;
        } catch(e) {
            console.log(e);
            return this._handleError(e);
        }
    }

    async delete(url, data = {}, headers = {}, responseType = null) {
        const config = this._buildConfig(headers, responseType);
        config.params = {
            '_method': 'DELETE'
        };
        try {
            let res = await axios.post(url, data, config);
            return res.data;
        } catch(e) {
            return this._handleError(e);
        }
    }

    _buildConfig(headers = {}, responseType) {
        var config = {};
        config.headers = headers;
        config.headers['x-locale'] = 'it';
        if (responseType) {
            config.responseType = responseType;
        }
        return config;
    }

    _handleError(error) {
        return error.response.data;
    }
  

}
