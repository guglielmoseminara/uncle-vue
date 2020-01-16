import { BaseElement } from './index';

export default class Header extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl, headerName) { 
        this.headerEl = parentEl.querySelector(`headers header[name='${headerName}']`);
        this.parentEl = parentEl;
        this.name = headerName;
        this.bind = this.headerEl.getAttribute('bind');
        this.type = this.headerEl.getAttribute('type');
        return this;
    }

} 