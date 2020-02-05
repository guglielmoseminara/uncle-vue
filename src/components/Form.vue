<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';
    import { Utils } from '../index';

    export default {
        props: {
            form: {
                type: String
            },
            params: {
                type: Object
            },
            item: {
                type: Object
            }
        },
        prop: ['value'],
        async created() {
            if (this.form) {
                this.formObject = this.$uncle.getForm(this.form);
                this.fieldsList = this.formObject.getFields();
                this.groupsList = this.formObject.getGroups();
                this.actionsList = this.formObject.getActions();
                this.$uncle.getApp().serviceManager.getEventEmitter().$on('resetFormEvent:'+this.formObject.name, async () => {
                    await this.init();
                    this.submitted = false;
                });
            }
            await this.init();
        },
        data() {
            return {
                formValue: this.value || {},
                formOutput: {},
                formDataValue: {},
                formObject: {},
                fieldsList: [],
                groupsList: [],
                actionsList: [],
                submitted: false,
            }
        },
        methods: {
            async init() {
                await this.loadItem();
                this.$emit('itemLoaded', this.item);
                this.initValue();
            },
            initValue() {
                this.formValue = {}
                for (let f in this.fieldsList) {
                    let field = this.fieldsList[f];
                    let value = this.getValue(this.item, field.type, field.name);
                    this.formValue[field.name] = field.bind ? this.getDotField(this, field.bind) : (this.item && value ? value : field.getDefault());
                }
                this.refreshWatching(true);
                this.buildFormOutput();
                this.formDataValue = Utils.encodeFormData(this.formOutput);
            },

            getDotField(item, fieldName) {
                return DotObject.pick(fieldName, item);
            },
               
            getItemValue(item, fieldName) {
                return item && item[fieldName] ? item[fieldName] : this.getDotField(item, fieldName);
            },
            getValue(item, type, name) {
                if (type == 'text') {
                    const value = this.getItemValue(item, name);
                    return value ? value.toString() : '';
                } else {
                    return this.getItemValue(item, name);
                }
            },
            triggerInput() {
                this.$emit('input', this.formValue);
            },
            async loadItem() {
                var item = {};
                if (this.form && this.params) {
                    item = await this.formObject.setParams(this.params).getItem();
                } else {
                    item = this.item;
                }
                this.item = item;
                this.initValue();
            },
            formUpdate(field, value) {
                this.formValue[field.name] = value;
                this.setFormImages();
                this.refreshWatching();
                this.buildFormOutput();
                this.formDataValue = Utils.encodeFormData(this.formOutput);
            },
            buildFormOutput() {
                for (let f in this.fieldsList) {
                    let field = this.fieldsList[f];
                    let formFieldName = field.name;
                    let formFieldValue = this.formValue[field.name];
                    if (field.alias) {
                        formFieldName = field.alias;
                    }
                    if (field.objProperty && this.formValue[field.name] && this.formValue[field.name][field.objProperty]) {
                        formFieldValue = this.formValue[field.name][field.objProperty];
                    }
                    if (field.type == 'resource') {
                        formFieldValue = DotObject.pick(field.item.valueField, formFieldValue);
                    }
                    if (field.type == 'resource_many' && this.formValue[field.name]) {
                        formFieldValue = this.formValue[field.name].map((item) => {
                            var obj = {};
                            obj[field.item.valueField] = item[field.item.valueField];
                            return obj;
                        });
                    }
                    this.formOutput[formFieldName] = formFieldValue;
                }
            },
            setFormImages() {
                for (var fieldName in this.formValue) {
                    const value = this.formValue[fieldName];
                    if (value && value.file) {
                        this.formValue[fieldName] = value.file;
                    }
                }
            },
            refreshWatching(init = false) {
                for (let f in this.fieldsList) {
                    let field = this.fieldsList[f];
                    if (field.watch && !init) {
                        this.formValue[field.name] = DotObject.pick(field.watch, this.formValue);
                    }
                }
            },
            async submit() {
                var response = null;
                if (this.formObject.action) {
                    this.formObject.action.setRequestParams(this.formDataValue);
                    response = await this.formObject.action.execute();
                }
                return response;
            }
        },
        watch: {
            formValue: function () {
                this.$emit('input', this.formValue);
            },
            params: function() {
                this.loadItem();
            }
        }
    } 
</script>