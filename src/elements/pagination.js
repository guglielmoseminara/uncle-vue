import { BaseElement } from '../index';

export default class Pagination extends BaseElement { 

    constructor() {
        super();
    }

    build(listEl) { 
        this.paginationEl = this.parser.getListPagination(listEl);
        this.perPage = parseInt(this.parser.getAttribute(this.paginationEl, 'per-page'));
        return this;
    }

} 