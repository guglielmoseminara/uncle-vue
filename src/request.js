import { BaseElement } from './index';

export default class Request extends BaseElement {

    constructor() {
        super();
    }

    build(requestName) {
        this.requestEl = this.mainEl.querySelector(`requests request[name="${requestName}"]`);
        this.name = requestName;
        return this;
    }

    getFields() {
        const fields = this.requestEl.querySelectorAll('fields field');
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.requestEl, field.getAttribute('name'));
        });
        return this.fields;
    }

    getHeaders() {
        const headers = this.requestEl.querySelectorAll('headers header');
        this.headers = Array.from(headers).map((header) => {
            return this.builder.getHeader(this.requestEl, header.getAttribute('name'));
        });
        return this.headers;
    }

    setPage(page) {
        this.page = page;
        return this;
    }

    setConditions(conditions) {
        this.conditions = conditions;
        return this;
    }

    setOrders(orders) {
        this.orders = orders;
        return this;
    }

}