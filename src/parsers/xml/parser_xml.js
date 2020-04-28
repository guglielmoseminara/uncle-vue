
import { JSDOM } from 'jsdom';

export default class ParserXML {

    constructor() {
        if (typeof window === 'undefined') {
            this.parser = new JSDOM();
        } else {
            this.parser = new window.DOMParser();
        }
    }

    init(xml) {
        if (typeof window === 'undefined') {
            this.xml = new JSDOM(xml,{ contentType:'application/xhtml+xml'}).window.document;
        } else {
            this.xml = this.parser.parseFromString(xml, 'text/xml');
        }
    }

    get(selector) {
        return this.xml.querySelector(selector);
    }

    getChild(element, selector) {
        return element.querySelector(selector);
    }

    getChildren(element, selector = null) {
        if (typeof window === 'undefined') {
            return selector ? Object.values(element.querySelectorAll(selector)) : Object.values(element.children);
        } else {
            return selector ? element.querySelectorAll(selector) : Object.values(element.children);
        }
    }

    getAttribute(element, attribute) {
        return element.getAttribute(attribute);
    }

    getInnerHTML(element) {
        return element.innerHTML;
    }

    getClosest(element, selector) {
        return element.closest(selector);
    }

    getTagName(element) {
        return element.tagName;
    }

    getInnerElements(element) {
        if (typeof window === 'undefined') {
            return Object.values(element.getElementsByTagName('*'));
        } else {
            return element.getElementsByTagName('*');
        }
    }

}