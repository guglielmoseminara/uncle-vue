import DotObject from 'dot-object';
import moment from 'moment';

export default {
    methods: {
        getItemValue(item, fieldName) {
            return DotObject.pick(fieldName, item);
        },
        getSingleItem(item, type, fieldName) {
            var value = this.getItemValue(item, fieldName);
            if (type == 'text') {
                value = value.toString();
            }
            return value;
        },
        getValue(item, field) {
            var path = '';
            if (field.bind) {
                path = field.bind;
            } else {
                path = field.name;
            }
            var value = null;
            const type = field.type;
            if (field.type == 'text' || field.type == 'datetime' || field.type == 'date') {
                var values = [];
                const pathList = path.split('+');
                for (let p = 0; p < pathList.length; p++) {
                    let value = this.getSingleItem(item, type, pathList[p]);
                    value = this.formatValue(value, field);
                    values.push(value);
                }
                value = values.join(' ');
            } else {
                value = this.getSingleItem(item, type, path);
                value = this.formatValue(value, field);
            }
            return value;
        },
        formatValue(value, field) {
            if (field.type == 'datetime') {
                return field.format == 'hh:mm' ? moment().startOf('day').add(value, 'minutes').format('HH:mm') : value;
            } else if (field.type == 'date') {
                return moment(value).format(field.format);
            } else {
                return value;
            }
        }
    }
}