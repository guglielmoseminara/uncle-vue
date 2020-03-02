<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';
    import { Utils } from '../index';
    import jexl from 'jexl';

    export default {
        props: {
            form: {
                type: String
            },
            params: {
                type: Object,
                default: () => ({})
            },
            itemObj: {
                type: Object
            },
            value: {}
        },
        async created() {
            if (this.form) {
                this.formObject = this.$uncle.getForm(this.form);
                this.fieldsList = this.formObject.getFields();
                this.fieldsObject = this.fieldsList.reduce((obj, field) => {
                    obj[field.name] = field;
                    return obj;
                }, {});
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
                fieldsObject: {},
                groupsList: [],
                actionsList: [],
                submitted: false,
                validated: false,
                item: this.itemObj || {},
                groupsVisibility: {},
                id: Math.random().toString(36).substring(2, 15),
            }
        },
        methods: {
            async init() {
                this.$stateManager.createScope(this.getScope());
                this.$stateManager.subscribeScope(this.getScope(), (changes) => {
                    for (let change in changes) {
                        let field = this.fieldsObject[change];
                        this.updateFormValue(field, changes[change]);
                    }
                });
                await this.loadItem();
                this.$emit('itemLoaded', this.item);
                //this.initValue();
            },
            initValue() {
                this.formValue = this.value || {}
                for (let f in this.fieldsList) {
                    let field = this.fieldsList[f];
                    if (!this.value || (this.value && !this.value[field.name])) {
                        let value = field.value ? field.value : (this.item ? this.getValue(this.item, field.type, field.name) : field.getDefault());
                        this.formValue[field.name] = field.bind ? this.getDotField(this, field.bind) : value;
                    }
                }
                this.updateLoop();
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
            triggerInputDataValue() {
                this.$emit('inputData', this.formDataValue);
            },
            async loadItem() {
                var item = {};
                if (this.form && !this.itemObj) {
                    item = await this.formObject.setParams(this.params).getItem();
                } else {
                    item = this.itemObj;
                }
                this.item = item;
                this.initValue();
            },
            formUpdate(field, value) {
                this.$stateManager.setScoped(this.getScope(), field.name, value);
                //this.updateFormValue(field, value);
            },
            updateFormValue(field, value) {
                this.formValue[field.name] = value;
                this.setFormImages();
                this.updateLoop();
            },  
            updateLoop() {
                this.refreshWatching();
                this.refreshGroupsVisibility();
                this.buildFormOutput();
                this.triggerInput();
                this.formDataValue = Utils.encodeFormData(this.formOutput);
                this.triggerInputDataValue();
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
                        if (Array.isArray(this.formValue[field.name])) {
                            formFieldValue = this.formValue[field.name].map((item) => {
                                var obj = {};
                                obj[field.item.valueField] = item[field.item.valueField];
                                return obj;
                            });
                        } else {
                            formFieldValue = this.formValue[field.name][field.item.valueField];
                        }
                    }
                    if (field.formatter) {
                        formFieldValue = field.formatter.format(formFieldValue);
                    }
                    if (typeof(formFieldValue) == 'undefined') {
                        formFieldValue = null;
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
            },
            getFirstFocusableField() {
                var field = null;
                for (let f in this.fieldsList) {
                    if (this.fieldsList[f].type == 'text') {
                        field = this.fieldsList[f];
                        break;
                    }
                }
                return field;
            },
            isSubmitted() {
                return this.submitted;
            },
            isValidated() {
                return this.validated;
            },
            getScope() {
                return this.id + (this.formObject ? this.formObject.name : '');
            },
            refreshGroupsVisibility() {
                for (let i = 0; i < this.groupsList.length; i++) {
                    let group = this.groupsList[i];
                    if (group.visible !== true) {
                        jexl.eval(group.visible, this.formValue).then((value) => {
                            this.groupsVisibility[group.name] = value == true;
                            this.$forceUpdate();
                        });    
                    } else {
                        this.groupsVisibility[group.name] = true;
                    }
                }
                this.$forceUpdate();
            },
            isGroupVisible(group) {
                return this.groupsVisibility[group.name];
            }
        },
        watch: {
            value: function() {
                this.initValue();
            },
            formValue: function () {
                // this.$emit('input', this.formValue);
            },
            params: function() {
                this.loadItem();
            }
        }
    } 
</script>