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
            //this.triggerInput();
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
                    let value = field.value ? field.value : (this.value ? this.value[field.name] : (this.item ? this.getSingleItem(this.item, field.type, field.name) : field.getDefault()));
                    this.formValue[field.name] = field.bind ? this.getItemValue(this, field.bind) : value;
                }
                this.$forceUpdate();
            }
        },
        watch: {
            value: function(value) {
                this.formValue = {};
                this.init();
            },
            itemObj() {
                this.init();
            }
        }
    }
</script>