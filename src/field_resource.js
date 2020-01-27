import { Field } from './index';

export default class FieldResource extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        this.item = this.builder.getItem(this.fieldEl);
        this.modal = this.fieldEl.getAttribute('modal') ? this.builder.getModal(this.fieldEl.getAttribute('modal')) : null;
        return this;
    }

    async getItems(search = null) {
        if (search) {
            this.item.setParams({
                'search': search
            });
        }
        const response = await this.item.getItems();
        return response.getData();
    }

}