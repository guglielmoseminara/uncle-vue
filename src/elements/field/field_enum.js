import { Field } from './index';
import { Utils } from '../../index';

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
            const options = this.parser.getElementOptions(this.fieldEl);
            this.options = Array.from(options).map((option) => {
                return {
                    name: Utils.decodeEntities(this.parser.getAttribute(option, 'name')),
                    text: Utils.decodeEntities(this.parser.getElementText(option)),
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