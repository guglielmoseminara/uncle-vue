<template>
    <div></div>
</template>

<script>
    import { FormFieldComponent } from './index';
    import ValueParserMixin from '../mixins/value_parser';

    export default {
        extends: FormFieldComponent,
        mixins: [ValueParserMixin],
        created() {
            this.fieldsList = this.fieldObject.getFields();
        },
        data() {
            return {
                formValue: {}
            }
        },
        methods: {
            init() {
                for (let f = 0; f < this.fieldsList.length; f++) {
                    let field = this.fieldsList[f];
                    if (!this.formValue || !this.formValue[field.name]) {
                        let value = field.value ? field.value : (this.value ? this.value[field.name] : (this.item ? this.getSingleItem(this.item, field.type, field.name) : field.getDefault()));
                        this.formValue[field.name] = field.bind ? this.getItemValue(this, field.bind) : value;
                    }
                }
                this.$forceUpdate();
            },
            update(fieldName, value) {
                this.formValue[fieldName] = value;
                this.triggerInput();
            }
        },
        watch: {
            value(value) {
                this.formValue = value || {};
            },
            itemObj() {
                this.init();
            }
        }
    }
</script>