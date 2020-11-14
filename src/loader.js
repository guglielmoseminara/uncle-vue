import { ParserXMLSdk , Builder } from './index';

export default class Loader {

    constructor() {
        this.parser = new ParserXMLSdk();
    }

    init(options = {}) {
        this._setOptions(options);
        this.parser.setConfig(this.options.xml);
        this.parser.setApp(this.options.app);
        this.parser.init();
        this.builder = new Builder(this.parser, this.options);
    }
    
    getParser() {
        return this.parser;
    }

    getBuilder() {
        return this.builder;
    }

    _setOptions(options) {
        this.options = options;
    }
}