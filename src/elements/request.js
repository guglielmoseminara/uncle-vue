import { BaseElement } from '../index';

export default class Request extends BaseElement {

    constructor() {
        super();
    }

    build(apiEl, requestName) {
        this.name = requestName;
        this.requestEl = this.parser.getApiRequest(apiEl, requestName);
        return this;
    }

    getFields() {
        const fields = this.parser.getElementFields(this.requestEl);
        this.fields = Array.from(fields).map((field) => {
            return this.builder.getField(this.requestEl, this.parser.getAttribute(field, 'name'));
        });
        return this.fields;
    }

    getHeaders() {
        const headers = this.parser.getElementHeaders(this.requestEl);
        this.headers = Array.from(headers).map((header) => {
            return this.builder.getHeader(this.requestEl, this.parser.getAttribute(header, 'name'));
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