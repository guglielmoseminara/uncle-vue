<template>
    <div></div>
</template>

<script>
    import { FormFieldComponent } from './index';
    import DotObject from 'dot-object';

    export default {
        extends: FormFieldComponent,
        async created() {
            await this.loadItems();
        },
        methods: {
            async loadItems() {
                var itemsList = [];
                if (!this.items) {
                    itemsList = await this.fieldObject.getItems();
                } else {
                    itemsList = this.items;
                }
                this.itemsList = itemsList;
            },
            triggerInput() {
                if (this.formValue) {
                    this.$emit('input', this.itemsList.find((el) => {
                        return el[this.fieldObject.item.valueField] == this.formValue[this.fieldObject.item.valueField];
                    }));
                }
            },
            getOptionText(option, textField) {
                return DotObject.pick(textField, option).toString();
            }
        },
        data() {
            return {
                itemsList: [],
                formValue: this.value || {}
            }
        }
    }
</script>