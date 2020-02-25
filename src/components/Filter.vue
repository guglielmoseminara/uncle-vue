<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';

    export default {
        props: {
            filter: {
                type: String
            },
            filterObj: {
                type: Object
            }
        },
        prop: ['value'],
        created() {
            if (this.filterObj) {
                this.filterObject = this.filterObj;
            }
            if (this.filter) {
                this.filterObject = this.$uncle.getFilter(this.filter);
            }
            this.fieldsList = this.filterObject.getFields();
            this.groupsList = this.filterObject.getGroups();
            this.initValue();
        },
        data() {
            return {
                filtersValue: this.value,
                fieldsList: this.fieldsList,
            }
        },
        methods: {
            initValue() {
                let filtersValue = {};
                for (let f in this.fieldsList) {
                    let field = this.fieldsList[f];
                    if (field.type == 'boolean' || field.type == 'text') {
                        filtersValue[field.name] = field.value == '1';
                    } else {
                        filtersValue[field.name] = field.value;
                    }
                }
                this.filtersValue = filtersValue;
                this.filtersText = Object.clone(filtersValue);
                this.triggerInput();
            },
            removeFilterArray(filterFieldName, index) {
                const fName = filterFieldName.replace('['+index+']', '');
                this.filtersValue[fName].splice(index, 1);
                this.filtersText[fName].splice(index, 1);
                if (this.filtersValue[fName].length == 0) {
                    delete this.filtersValue[fName];
                }
                if (this.filtersText[fName].length == 0) {
                    delete this.filtersText[fName];
                }
            },
            removeFilter(filterFieldName) {
                const squareBracketsList = filterFieldName.match(/[^[\]]+(?=])/g);
                if (squareBracketsList && squareBracketsList.length > 0) {
                    this.removeFilterArray(filterFieldName, parseInt(squareBracketsList[0]));
                } else {
                    this.filtersValue[filterFieldName] = false;
                    this.filtersText[filterFieldName] = false;
                }
            },
            getSummary() {
                var summary = this.fieldsList.reduce((previous, row) => { 
                    var filter = this.filtersText[row.name];
                    if (filter) {
                        if (row.type == 'resource' || row.type == 'enum' || row.type == 'date') {
                            return previous.concat({name:row.name, text:row.text + ':' + filter});
                        } else if (row.type == 'resource_many') {
                            for (let f in filter) {
                                previous = previous.concat({name:row.name+'['+f+']', text:row.text + ':' + filter[f]});
                            }
                            return previous;
                        } else if (row.type == 'number' && row.widget == 'slider') {
                            return previous.concat({name:row.name, text:row.text + ': '+row.min+' - ' + filter + ' '+row.symbol});
                        } else {
                            return previous.concat({name:row.name, text:row.text});
                        }
                    }
                    return previous;
                }, []);
                return summary;
            },
            getParams(defaultValue) {
                return this.fieldsList.reduce((previous, row) => {
                    var filter = this.filtersValue[row.name];
                    if (filter) {
                        if (row.type == 'enum' || row.type == 'resource' || row.type == 'resource_many' || row.type == 'date') {
                            previous[row.name] = filter;
                        } else if (row.type == 'boolean') {
                            previous[row.name] = true;
                        } else if (row.type == 'number' && row.widget == 'slider') {
                            previous[row.name] = [row.min, filter];
                        } else {
                            previous[row.name] = defaultValue;
                        }
                    }
                    return previous;
                }, {});
            },
            triggerInput() {
                this.$emit('input', this.filtersValue);
            },
            filterUpdate(field, value) {
                if (field.type == 'resource') {
                    this.filtersValue[field.name] = DotObject.pick(field.item.valueField, value);
                    this.filtersText[field.name] = DotObject.pick(field.item.textField, value);
                } else if (field.type == 'resource_many') {
                    this.filtersValue[field.name] = value.map(item => {
                        return DotObject.pick(field.item.valueField, item);
                    });
                    this.filtersText[field.name] = value.map(item => {
                        return DotObject.pick(field.item.textField, item);
                    });
                }
                else if (field.type == 'enum') {
                    this.filtersValue[field.name] = value;
                    this.filtersText[field.name] = field.getOptions().find((el) => {
                        return el.name == value;
                    }).text;
                } else if (field.type == 'number' && field.widget == 'slider') {
                    this.filtersValue[field.name] = value;
                    this.filtersText[field.name] = value;
                } else {
                    this.filtersValue[field.name] = value;
                    this.filtersText[field.name] = value;
                }
            },
            getFilterFieldValue(field) {
                var value = this.filtersValue[field.name];
                if (field.type == 'resource_many') {
                    if (this.filtersText[field.name]) {
                        value = this.filtersText[field.name].map((item, index) => {
                            var obj = {};
                            obj[field.item.valueField] = this.filtersValue[field.name][index];
                            obj[field.item.textField] = this.filtersText[field.name][index];
                            return obj
                        });
                    }
                }
                return value;
            }
        }
    } 
</script>