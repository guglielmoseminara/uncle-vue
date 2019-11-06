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