import { BaseElement } from './index';

export default class Pagination extends BaseElement { 

    constructor() {
        super();
    }

    build(listEl) { 
        this.paginationEl = listEl.querySelector(`pagination`);
        this.perPage = parseInt(this.paginationEl.getAttribute('per-page'));
        return this;
    }

} 