import { BaseElement } from '../index';

export default class Header extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, headerName) { 
        this.parentEl = parentEl;
        this.name = headerName;
        this.headerEl = this.parser.getElementHeader(parentEl, headerName);
        this.bind = this.parser.getAttribute(this.headerEl, 'bind');
        this.type = this.parser.getAttribute(this.headerEl, 'type');
        return this;
    }

} 