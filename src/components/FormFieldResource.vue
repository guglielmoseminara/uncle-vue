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
                        return DotObject.pick(this.fieldObject.item.valueField, el) == this.formValue;
                    }));
                }
            },
            getOptionText(option, textField) {
                return DotObject.pick(textField, option).toString();
            }
        },
        data() {
            return {
                itemsList: []
            }
        }
    }
</script>