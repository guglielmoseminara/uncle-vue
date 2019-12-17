import {
    Label,
    LabelField,
} from './index';

export default class LabelBuilder {

    getLabel(parentEl) {
        const type = parentEl.querySelector(`label`).getAttribute('type');
        if (type == 'field') {
            return new LabelField();    
        } 
        return new Label();
    }

}