import { BaseElement } from '../index';
import { List } from 'collections/list';

export default class Page extends BaseElement {

    constructor() {
        super();
    }

    build(viewEl) {
        this.pageEl = this.parser.getViewPage(viewEl);
        this.component = this.parser.getAttribute(this.pageEl, 'component');
        var elements = this.parser.getInnerElements(this.pageEl);
        this.components = new List(Array.from(elements).map((element) => {
            return this.builder.build(element.tagName, this.parser.getAttribute(element, 'name'));
        }));
        return this;
    }

    getComponents(className = null) {
        return className == null ? this.components.toArray() : this.components.filter((component) => {
            return component.className == className.toLowerCase() ? component : false;  
        });
    }

}