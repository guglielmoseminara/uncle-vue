<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';

    export default {
        props: {
            form: {
                type: String
            },
            params: {
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
            }
            await this.loadItem();
            this.initValue();
        },
        data() {
            return {
                formValue: this.value || {},
                formObject: {},
                fieldsList: [],
                groupsList: [],
                actionsList: [],
            }
        },
        methods: {
            initValue() {
                this.formValue = {}
                for (let f in this.fieldsList) {
                    let field = this.fieldsList[f];
                    let value = this.getValue(this.item, field.type, field.name);
                    this.formValue[field.name] = this.item && value ? value : (field.bind ? this.getDotField(this, field.bind) : field.getDefault());
                }
            },

            getDotField(item, fieldName) {
                return DotObject.pick(fieldName, item);
            },
               
            getItemValue(item, fieldName) {
                return this.getDotField(item, fieldName);
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
                if (!this.item) {
                    item = await this.formObject.setParams(this.params).getItem();
                } else {
                    item = this.item;
                }
                this.item = item;
                this.initValue();
            },
            formUpdate(field, value) {
                this.formValue[field.name] = value;
            }
        },
        watch: {
            formValue: function () {
                this.$emit('input', this.formValue);
            }
        }
    } 
</script>