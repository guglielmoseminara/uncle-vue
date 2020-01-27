import {
    Field,
    EnumField,
    ActionListField,
    FieldResource,
    FieldCustom,
} from './index';

export default class FieldBuilder {

    getField(parentEl, fieldName) {
        const type = parentEl.querySelector(`fields field[name='${fieldName}']`).getAttribute('type');
        if (type == 'actions-list') {
            return new ActionListField();    
        } else if (type == 'enum') {
            return new EnumField(); 
        } else if (type == 'resource' || type == 'resource_many') {
            return new FieldResource(); 
        } else if (type == 'custom') {
            return new FieldCustom(); 
        }
        return new Field();
    }

}