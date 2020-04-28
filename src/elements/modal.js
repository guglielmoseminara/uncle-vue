import { BaseElement } from '../index';
import { List } from 'collections/list';

export default class Modal extends BaseElement {

    constructor() {
        super();
    }

    build(modalName) {
        this.name = modalName;
        this.modalEl = this.parser.getModal(modalName);
        this.title = this.parser.getAttribute(this.modalEl, 'title');
        var elements = this.parser.getInnerElements(this.modalEl);
        this.components = elements.length > 0 ? new List(Array.from(elements).map((element) => {
            return this.builder.build(element.tagName, this.parser.getAttribute(element, 'name'));
        })) : [];
        return this;
    }

    getPage() {
        return this.builder.getPage(this.viewEl);
    }

    getComponents(className = null) {
        return this.components ? (className == null ? this.components : this.components.filter((component) => {
            return component.className == className.toLowerCase() ? component : false;  
        })) : [];
    }
}