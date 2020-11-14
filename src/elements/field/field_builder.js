import {
    Field,
    FieldEnum,
    FieldActionList,
    FieldResource,
    FieldCustom,
    FieldResourceMany,
    FieldGeoAddress,
    FieldNumber,
    FieldAction,
    FieldDateTime,
    FieldDate,
} from './index';

import { BaseBuilder } from '../../index'; 

export default class FieldBuilder extends BaseBuilder{

    getField(parentEl, fieldName) {
        const type = this.parser.getAttribute(this.parser.getElementField(parentEl, fieldName), 'type');
        return this.buildField(type);
    }

    buildField(type) {
        if (type == 'actions-list') {
            return new FieldActionList();    
        } else if (type == 'enum') {
            return new FieldEnum(); 
        } else if (type == 'resource') {
            return new FieldResource(); 
        } else if (type == 'resource_many') {
            return new FieldResourceMany();         
        } else if (type == 'geoaddress') {
            return new FieldGeoAddress();         
        } else if (type == 'number') {
            return new FieldNumber();
        } else if (type == 'action') {
            return new FieldAction();
        } else if (type == 'datetime') {
            return new FieldDateTime();
        } else if (type == 'date') {
            return new FieldDate();
        } else if (type == 'custom') {
            return new FieldCustom(); 
        }
        return new Field();
    }

}