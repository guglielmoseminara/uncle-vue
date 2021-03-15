import { BaseElement } from '../index';

export default class List extends BaseElement {

    constructor() {
        super();
    }

    build(listName) {
        this.name = listName;
        this.listEl = this.parser.getElementList(this.mainEl, listName);
        this.type = this.parser.getAttribute(this.listEl, 'type');
        this.conditions = {};
        this.orders = [];
        this.page = 1;
        this.selectable = this.parser.getAttribute(this.listEl, 'selectable') == 'true';
        this.selectable_id = this.parser.getAttribute(this.listEl, 'selectable-id') || 'id';
        this.pagination = this.parser.getListPagination(this.listEl) ? this.builder.getPagination(this.listEl) : null;
        if (this.parser.getElementItems(this.listEl)) {
            this.item = this.builder.getItem(this.listEl);
        }
        this.rows = this.builder.getRows(this.listEl);
        this.text = this.parser.getAttribute(this.listEl, 'text') || '';
        this.ssr = this.parser.getAttribute(this.listEl, 'ssr');
        this.totalItems = 0;
        return this;
    }

    async initSSR() {
        if (this.item) {
            const items = await this.getItems();
            this.serviceManager.getStateManager().setScoped('ssr', `list:${this.name}`, items);
        }
    }

    getFields() {
        const fields = this.parser.getElementFields(this.listEl);
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.listEl, this.parser.getAttribute(field, 'name'));
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
        const actions = this.parser.getElementActionItems(this.listEl);
        this.actions = Array.from(actions).map((action) => {
            return this.builder.getActionItem(this.listEl, this.parser.getAttribute(action, 'name'));
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
        this.params = this.params ? this.params : {};
        this.params.page = this.page;
        this.params.perPage = this.pagination ? this.pagination.perPage : -1;
        this.params.orderBy = this.orders ? this.orders.map((order) => {
            return order.field;
        }).join(',') : '';
        this.params.sortedBy = this.orders ? this.orders.map((order) => {
            return order.direction;
        }).join(',') : '';
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
