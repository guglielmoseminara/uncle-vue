import { BaseElement, Result } from '../index';
import DotObject from 'dot-object';

export default class Response extends BaseElement {

    constructor() {
        super();
    }

    build(apiEl, responseName = null) {
        if (responseName) {
            this.responseEl = this.parser.getApiResponse(apiEl, responseName);
        } else {
            const responses = this.parser.getApiResponses(apiEl);
            if (responses.length == 1) {
                this.responseEl = responses[0];
            } else {
                this.responseEl = this.parser.getApiDefaultResponse(apiEl);
            }
        }
        this.type = this.parser.getAttribute(this.responseEl, 'type');
        return this;
    }

    format(response) {
        const elements = this.parser.getElementChildren(this.responseEl);
        if (elements.length > 0) {
            var newResponse = {};
            newResponse = this._formatFields(elements, response, newResponse);
            return new Result(newResponse);
        } else {
            return new Result(response);
        }
    }

    _formatFields(elements, response, newResponse, prefix = '') {
        for (let el = 0; el < elements.length; el++) {
            const element = elements[el];
            const elementChildren = this.parser.getElementChildren(element);
            if (elementChildren && elementChildren.length > 0) {
                this._formatFields(elementChildren, response, newResponse, prefix + this.parser.getElementName(element).toLowerCase() + '.');
            } else {
                DotObject.copy(this.parser.getAttribute(element, 'path'), prefix+this.parser.getElementName(element).toLowerCase(), response, newResponse);
            }
        }
        return newResponse; 
    }
}