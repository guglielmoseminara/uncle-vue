import axios from 'axios';

export default class Http { 

    async get(url, headers = {}) {
        const config = this._buildConfig(headers);
        try {
            const res = await axios.get(url, config);
            return res.data;
        } catch (e) {
            return this._handleError(e);
        }
    }

    async put(url, data = {}, headers = {}) {
        const config = this._buildConfig(headers);
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

    async post(url, data = {}, headers = {}) {
        const config = this._buildConfig(headers);
        try {
            let res = await axios.post(url, data, config);
            return res.data;
        } catch(e) {
            return this._handleError(e);
        }
    }

    async delete(url, data = {}, headers = {}) {
        const config = this._buildConfig(headers);
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

    _buildConfig(headers = {}) {
        var config = {};
        config.headers = headers;
        config.headers['x-locale'] = 'it';
        return config;
    }

    _handleError(error) {
        return error.response.data;
    }
  

}
