import _ from 'lodash';

export default class LanguageProvider{
    constructor() {
        this.labels = {}
        this.locale = 'en';    
    }

    setLocale(locale) {
        this.locale = locale;
    }

    getLocale() {
        return this.locale;
    }
    
    get(key) {
        return this.labels[this.locale][key] ? this.labels[this.locale][key] : '';
    }

    merge(obj) {
        this.labels = _.mergeWith(this.labels, obj);
    }

    parse(text) {
        var context = this.labels[this.locale];
        var matches = text.match(/\{\{(.*?)\}\}/g);
        for (let match in matches) {
            let variable = matches[match].match(/\{\{(.*)\}\}/);
            if (context[variable[1]]) {
                text = text.replace(matches[match], context[variable[1]]);
            }
        }
        return text;
    }
}