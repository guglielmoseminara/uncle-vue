import { BaseElement, Result } from './index';
import DotObject from 'dot-object';

export default class Response extends BaseElement {

    constructor() {
        super();
    }

    build(apiEl) {
        this.responseEl = apiEl.querySelector('response');
        return this;
    }

    format(response) {
        const elements = this.responseEl.children;
        var newResponse = {};
        this._formatFields(elements, response, newResponse);
        return new Result(newResponse);
    }

    _formatFields(elements, response, newResponse, prefix = '') {
        for (let el = 0; el < elements.length; el++) {
            const element = elements[el];
            if (element.children && element.children.length > 0) {
                this._formatFields(element.children, response, newResponse, prefix + element.tagName + '.');
            } else {
                DotObject.copy(element.getAttribute('path'), prefix+element.tagName, response, newResponse);
            }
        } 
    }
}