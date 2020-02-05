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
        if (this.options) {
            return this.options;
        } else {
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

    getItemValue(name) {
        const optionsList = this.getOptions();
        for (let optIndex = 0; optIndex < optionsList.length; optIndex++) {
            let opt = optionsList[optIndex];
            if (opt.name == name) {
                return opt.text;
            }
        }
    }

}