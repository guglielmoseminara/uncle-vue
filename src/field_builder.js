import {
    Field,
    EnumField,
    ActionListField,
    FieldResource,
} from './index';

export default class FieldBuilder {

    getField(parentEl, fieldName) {
        const type = parentEl.querySelector(`fields field[name='${fieldName}']`).getAttribute('type');
        if (type == 'actions-list') {
            return new ActionListField();    
        } else if (type == 'enum') {
            return new EnumField(); 
        } else if (type == 'resource') {
            return new FieldResource(); 
        }
        return new Field();
    }

}