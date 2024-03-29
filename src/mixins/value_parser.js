import DotObject from 'dot-object';
//import moment from 'moment';
var moment = require('moment');

export default {
    methods: {
        getItemValue(item, fieldName) {
            const value = DotObject.pick(fieldName, item);
            return (value || value == '0') ? value : null;
        },
        getSingleItem(item, type, fieldName) {
            var value = this.getItemValue(item, fieldName);
            if (type == 'text' && value) {
                value = value.toString();
            }
            return value;
        },
        getValueByType(field, item, path) {
            var value = null;
            const type = field.type;
            if (type == 'text' || type == 'datetime' || type == 'date') {
                var values = [];
                const pathList = path.split('+');
                for (let p = 0; p < pathList.length; p++) {
                    let value = this.getSingleItem(item, type, pathList[p]);
                    value = this.formatValue(value, field);
                    values.push(value);
                }
                value = values.join(' ');
            } else if(type == 'date_range') {
                const fields = field.getFields();
                var dateFromField = fields[0];
                var dateToField = fields[1];
                var dateFromPath = dateFromField.bind ? dateFromField.bind : dateFromField.name;
                var dateToPath = dateToField.bind ? dateToField.bind : dateToField.name;
                var dateFromValue = this.formatValue(this.getSingleItem(item, dateFromField.type, dateFromPath), dateFromField);
                var dateToValue = this.formatValue(this.getSingleItem(item, dateToField.type, dateToPath), dateToField);
                value = [dateFromValue, dateToValue];
            } else if (type == 'custom') {
                const fields = field.getFields();
                if (fields.length > 0) {
                    value = fields.reduce((obj, field) => {
                        obj[field.name] = this.getValueByType(field, item, field.bind ? field.bind : field.name);
                        return obj;
                    }, {});
                } else {
                    value = this.getSingleItem(item, type, path);
                    value = this.formatValue(value, field);
                }
            }
            else {
                value = this.getSingleItem(item, type, path);
                value = this.formatValue(value, field);
            }
            return value;
        },
        getValue(item, field) {
            const path = field.bind ? field.bind : field.name;
            return this.getValueByType(field, item, path);
        },
        formatValue(value, field) {
            return field.getValueFormatted(value);
        }
    }
}
