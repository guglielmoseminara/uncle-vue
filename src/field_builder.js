import {
    Field,
    EnumField,
    ActionListField,
    FieldResource,
    FieldCustom,
    FieldResourceMany,
    FieldGeoAddress
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
        } else if (type == 'resource_many') {
            return new FieldResourceMany();         
        } else if (type == 'geoaddress') {
            return new FieldGeoAddress();         
        } else if (type == 'custom') {
            return new FieldCustom(); 
        }
        return new Field();
    }

}