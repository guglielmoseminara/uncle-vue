import { Field } from './index';

export default class EnumField extends Field { 

    constructor() {
        super();
    }

    build(parentEl, fieldName) {
        super.build(parentEl, fieldName);
        return this;
    }

    getOptions() {
        const options = this.fieldEl.querySelectorAll('options option');
        this.options = Array.from(options).map((option) => {
            return {
                name: option.getAttribute('name'),
                text: option.innerHTML,
            }
        });
        return this.options;
    }

}