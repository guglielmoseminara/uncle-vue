import { BaseElement } from './index';
import { List } from 'collections/list';

export default class Page extends BaseElement {

    constructor() {
        super();
    }

    build(viewEl) {
        this.pageEl = viewEl.querySelector('page');
        this.name = this.pageEl.getAttribute('name');
        this.type = this.pageEl.getAttribute('type');
        var elements = this.pageEl.getElementsByTagName('*');
        this.components = new List(Array.from(elements).map((element) => {
            return this.builder.build(element.tagName, element.getAttribute('name'));
        }));
        return this;
    }

    getComponents(className = null) {
        return className == null ? this.components : this.components.filter((component) => {
            return component.constructor.name == className ? component : false;  
        });
    }

}