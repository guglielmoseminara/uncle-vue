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
            this.fieldsRange = this.fieldObject.getFields();
            this.init();
        },
        data() {
            return {
                formValue: {},
                fieldsRange: []
            }
        },
        methods: {
            init() {
                for (let f = 0; f < this.fieldsRange.length; f++) {
                    let field = this.fieldsRange[f];
                    if (!this.formValue || !this.formValue[field.name]) {
                        let value = field.value ? field.value : (this.value ? this.value[field.name] : (this.item ? this.getSingleItem(this.item, field.type, field.name) : field.getDefault()));
                        this.formValue[field.name] = field.bind ? this.getItemValue(this, field.bind) : value;
                    }
                }
                this.$forceUpdate();
            },
            getFieldName(field) {
                return this.fieldObject.name + field.name;
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