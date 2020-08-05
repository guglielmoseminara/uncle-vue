<template>
    <div></div>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            fieldObject: {
                type: Object
            },
            itemObj: {
                type: Object
            },
            showErrors: {
                type: Boolean
            },
            placeholder: {
                type: String,
            },
            scope: {
                type: String,
            },
            value: {}
        },
        mounted() {
            /*if (this.fieldObject && this.fieldObject.getForm()) {
                this.$validator.validateAll(this.fieldObject.getForm().name);
            }*/
        },
        methods: {
            triggerInput() {
                this.$emit('input', this.formValue);
            },
            getIcon() {
                return this.$iconsProvider.get(this.fieldObject.icon);
            },
            isErrorsVisible(fieldName) {
                console.log(this.showErrorsFlag, this.formErrors[fieldName]);
                return (this.showErrorsFlag && this.formErrors[fieldName])
            },
            getFieldName(field) {
                return this.scope+'_'+field.name;
            }
        },
        data() {
            return {
                formValue: this.value,
                item: this.itemObj || {},
                showErrorsFlag: this.showErrors || false,
                placeholderString: this.placeholder || '', 
            }
        },
        watch: {
            value: function(val) {
                this.formValue = val;
            },
            itemObj(value) {
                this.item = value;
            },
            showErrors(value) {
                this.showErrorsFlag = value;
            },
            placeholder(value) {
                this.placeholderString = value;
            }
        },
        computed: {
            formErrors() {
                var errors = {};
                var filteredErrors = this.filteredErrors;
                for(let e in filteredErrors) {
                    let formItem = filteredErrors[e];
                    errors[formItem.field] = formItem;
                }
                return errors;
            },
            filteredErrors() {
                if (this.fieldObject.getForm()) {
                    return this.$validator.errors.items.filter((item) => {
                        return item.scope == this.scope
                    });
                } else {
                    return {};
                }
            }
        }
    }
</script>