import UncleConfig from '../../../uncle.config.js';

import { Parser } from './index';

export default class Loader {

    constructor() {
        this.parser = new Parser();
    }

    parse() {
        this.parser.parseXML(this.uncleConfig, 'text/xml');
    }

    init(options = {}) {
        if (!this.options) {
            this._setOptions(options);
        }
        this.uncleConfig = UncleConfig.xmlConfig;
        this.parse();
    }
    
    getParser() {
        return this.parser;
    }

    loadView(view) {
        return require(this.options.viewPath+'/'+view+'.vue').default;
    }

    _setOptions(options) {
        this.options = options;
    }
}