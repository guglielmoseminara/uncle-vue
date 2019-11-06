<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';

    export default {
        props: {
            filter: {
                type: String,
                required: true
            }
        },
        prop: ['value'],
        created() {
            this.filterObject = this.$uncle.getFilter(this.filter);
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
                    if (this.fieldsList[f].type == 'boolean' || this.fieldsList[f].type == 'text') {
                        filtersValue[this.fieldsList[f].name] = this.fieldsList[f].value == '1';
                    } else {
                        filtersValue[this.fieldsList[f].name] = this.fieldsList[f].value;
                    }
                }
                this.filtersValue = filtersValue;
                this.filtersText = Object.clone(filtersValue);
                this.triggerInput();
            },
            removeFilter(filterFieldName) {
                this.filtersValue[filterFieldName] = false;
                this.filtersText[filterFieldName] = false;
            },
            getSummary() {
                return this.fieldsList.reduce((previous, row) => { 
                    var filter = this.filtersText[row.name];
                    if (filter) {
                        if (row.type == 'resource' || row.type == 'enum') {
                            return previous.concat({name:row.name, text:row.text + ':' + filter});
                        } else {
                            return previous.concat({name:row.name, text:row.text});
                        }
                    }
                    return previous;
                }, []);
            },
            getParams(defaultValue) {
                return this.fieldsList.reduce((previous, row) => {
                    var filter = this.filtersValue[row.name];
                    if (filter) {
                        if (row.type == 'enum' || row.type == 'resource') {
                            previous[row.name] = filter;
                        } else if (row.type == 'boolean') {
                            previous[row.name] = true;
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
                } else if (field.type == 'enum') {
                    this.filtersValue[field.name] = value;
                    this.filtersText[field.name] = field.getOptions().find((el) => {
                        return el.name == value;
                    }).text;
                } else {
                    this.filtersValue[field.name] = value;
                    this.filtersText[field.name] = value;
                }
            }
        }
    } 
</script>