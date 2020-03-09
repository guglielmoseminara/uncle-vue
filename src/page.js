import { BaseElement } from './index';
import { List } from 'collections/list';

export default class Page extends BaseElement {

    constructor() {
        super();
    }

    build(viewEl) {
        this.pageEl = viewEl.querySelector('page');
        this.component = this.pageEl.getAttribute('component');
        var elements = this.pageEl.getElementsByTagName('*');
        this.components = new List(Array.from(elements).map((element) => {
            return this.builder.build(element.tagName, element.getAttribute('name'));
        }));
        return this;
    }

    getComponents(className = null) {
        return className == null ? this.components : this.components.filter((component) => {
            return component.className == className.toLowerCase() ? component : false;  
        });
    }

}