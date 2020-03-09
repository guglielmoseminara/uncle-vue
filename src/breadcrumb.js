import { BaseElement } from './index';

export default class Breadcrumb extends BaseElement { 

    constructor() {
        super();
    }

    build(breadcrumbName) {
        this.breadcrumbEl = this.mainEl.querySelector(`breadcrumbs breadcrumb[name="${breadcrumbName}"]`);
        this.name = this.breadcrumbEl.getAttribute('name');
        this.parent = this.breadcrumbEl.getAttribute('parent') ? this.builder.getBreadcrumb(this.breadcrumbEl.getAttribute('parent')) : null;
        this.originalText = this.breadcrumbEl.getAttribute('text');
        this.text = this.originalText;
        this.url = this.originalUrl;
        this.route = this.breadcrumbEl.getAttribute('route') ? this.builder.getRoute(this.breadcrumbEl.closest('app'), this.breadcrumbEl.getAttribute('route')) : null;
        this.originalUrl = this.route ? this.route.url : '';
        return this;
    }

    compile(context = {}) {
        this.text = this._replaceText(this.originalText, context);
        this.url = this._replaceText(this.originalUrl, context);
        var parent = this.parent;
        while (parent) {
            parent.text = this._replaceText(parent.originalText, context);
            parent.url = this._replaceText(parent.originalUrl, context);
            parent = parent.parent;
        }
    }

    _replaceText(text, context = {}) {
        let matches = text.match(/\{(.*?)\}/g);
        for (let match in matches) { 
            let variable = matches[match].match(/\{(.*)\}/)[1];
            if (context && context[variable]) {
                text = text.replace(matches[match], context[variable]);
            }
        }
        return text;
    }

    getItems() {
        var items = [];
        items.push({
            text: this.text,
            url: this.url
        });
        var parent = this.parent;
        while (parent) {
            items.push({
                text: parent.text,
                url: parent.url
            });
            parent = parent.parent;
        }
        return items.reverse();
    }

}