import { BaseElement, Result } from './index';
import DotObject from 'dot-object';

export default class Response extends BaseElement {

    constructor() {
        super();
    }

    build(apiEl, responseName = null) {
        if (responseName) {
            this.responseEl = apiEl.querySelector(`responses response[name="${responseName}"]`);
        } else {
            const responses = apiEl.querySelectorAll('response');
            if (responses.length == 1) {
                this.responseEl = responses[0];
            } else {
                this.responseEl = apiEl.querySelector('response[default=true]');
            }
        }
        this.type = this.responseEl.getAttribute('type');
        return this;
    }

    format(response) {
        const elements = this.responseEl.children;
        if (elements.length > 0) {
            var newResponse = {};
            this._formatFields(elements, response, newResponse);
            return new Result(newResponse);
        } else {
            return new Result(response);
        }
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