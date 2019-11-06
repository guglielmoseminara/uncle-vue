import { BaseElement } from './index';

export default class List extends BaseElement {

    constructor() {
        super();
    }

    build(listName) {
        this.listEl = this.mainEl.querySelector(`lists list[name="${listName}"]`);
        this.name = listName;
        this.type = this.listEl.getAttribute('type');
        this.conditions = {};
        this.orders = {};
        this.page = 1;
        this.pagination = this.builder.getPagination(this.listEl);
        this.item = this.builder.getItem(this.listEl);
        this.rows = this.builder.getRows(this.listEl);
        this.totalItems = 0;
        return this;
    }

    getFields() {
        const fields = this.listEl.querySelectorAll('fields field');
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.listEl, field.getAttribute('name'));
        });
        return this.fields;
    }

    getPagination() {
        return this.pagination;
    }

    getRows() {
        return this.rows;
    }

    getActions() {
        const actions = this.listEl.querySelectorAll(':scope > actions action-item');
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getActionItem(this.listEl, action.getAttribute('name'));
        });
        return this.actions;
    }

    getTotalItems() {
        return this.totalItems;
    }

    async getItems() {
        const items = await this.item.setParams(this._getItemsParams()).getItems();
        this.setTotalItems(items.getTotal());
        return items.getData();
    }

    _getItemsParams() {
        this.params.page = this.page;
        this.params.perPage = this.pagination.perPage;
        this.params.orderBy = this.orders.map((order) => {
            return order.field;
        }).join(',');
        this.params.sortedBy = this.orders.map((order) => {
            return order.direction;
        }).join(',');
        console.log(this.params);
        return this.params;
    }

    setPage(page) {
        this.page = page;
        return this;
    }

    setParams(params) {
        this.params = params;
        return this;
    }

    setOrders(orders) {
        this.orders = orders;
        return this;
    }

    setTotalItems(totalItems) {
        this.totalItems = totalItems;
        return this;
    }

}
