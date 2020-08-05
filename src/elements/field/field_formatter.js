import { BaseElement } from '../../index';
import DotObject from 'dot-object';

export default class FieldFormatter extends BaseElement { 

    constructor() {
        super();
    }

    build(parentEl) {
        this.formatterEl = this.parser.getElementFormatter(parentEl);
        this.valueType = this.parser.getAttribute(this.formatterEl, 'value-type');
        return this;
    }

    getFields() {
        if (this.fields) {
            return this.fields;
        } else if (this.formatterEl){
            const fields = this.parser.getElementFields(this.formatterEl);
            this.fields = Array.from(fields).map((field) => {
                return this.builder.getField(this.formatterEl, this.parser.getAttribute(field, 'name'));
            });
            return this.fields;    
        }
    }

    format(value) {
        var formattedValue = value;
        if (this.valueType == 'array') {
            formattedValue = this._parseArray(value, this);
        }
        return formattedValue;
    }

    _parse(itemValue, field) {
        const fields = field.getFields();
        var row = {};
        for (let i = 0; i < fields.length; i++) {
            let field = fields[i];
            let value = itemValue[field.name];
            console.log(field.name, field.type, value, itemValue);
            if (field.bind) {
                value = DotObject.pick(field.bind, itemValue);
            }
            if (value) {
                if (field.type == 'array') {
                    var arrayRows = [];
                    for (let r = 0; r < value.length; r++) {
                        arrayRows.push(this._parse(value[r], field));
                    }
                    row[field.name] = arrayRows;
                } else if (field.type == 'price') {
                    row[field.name] = Math.round(parseFloat(value) * 100);
                } 
                else {
                    row[field.name] = value;
                }
            }
        }
        return row;
    }

    _parseArray(value, fieldObject) {
        var rows = [];
        if (value) {
            for (let r = 0; r < value.length; r++) {
                rows[r] = this._parse(value[r], fieldObject);
            }    
        }
        return rows;
    }


}