import { Builder } from './index';

export default class Parser {

    constructor() {
        this.parser = new DOMParser();
    }

    parseXML(xml) {
        this.xml = this.parser.parseFromString(xml, 'text/xml');
        this.builder = new Builder(this.xml.querySelector('uncle'));
    }

    getApp(appName) {
        return this.builder.getApp(appName);
    }

    getApi(apiName) {
        return this.builder.getApi(apiName);
    }
}