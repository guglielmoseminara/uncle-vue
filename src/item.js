import { BaseElement } from './index';

export default class Item extends BaseElement {

    constructor() {
        super();
    }

    build(parentEl) {
        this.itemEl = parentEl.querySelector('items');
        return this;
    }
    
}