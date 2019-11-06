import { BaseElement } from './index';
import { List } from 'collections/list';

export default class Modal extends BaseElement {

    constructor() {
        super();
    }

    build(modalName) {
        this.modalEl = this.mainEl.querySelector(`modals modal[name="${modalName}"]`);
        this.name = modalName;
        this.title = this.modalEl.getAttribute('title');
        var elements = this.modalEl.getElementsByTagName('*');
        this.components = new List(Array.from(elements).map((element) => {
            return this.builder.build(element.tagName, element.getAttribute('name'));
        }));
        return this;
    }

    getPage() {
        return this.builder.getPage(this.viewEl);
    }

    getComponents(className = null) {
        return className == null ? this.components : this.components.filter((component) => {
            return component.constructor.name == className ? component : false;  
        });
    }
}