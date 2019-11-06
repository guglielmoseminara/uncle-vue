import { Results } from './index';

export default class PaginatedResults extends Results {

    constructor(results) {
        super(results);
        this.currentPage = results.current_page;
        this.total = results.total;
        this.perPage = results.per_page;
    }

    getTotal() {
        return this.total;
    }

    getPerPage() {
        return this.perPage;
    }

    getCurrentPage() {
        return this.currentPage;
    }

}