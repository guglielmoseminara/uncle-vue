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
                if (this.itemsList) {
                    for (let i = 0; i < this.itemsList.length; i++) {
                        let item = this.itemsList[i];
                        let valueField = item[this.fieldObject.item.valueField];
                        if (valueField) {
                            this.itemsDict[valueField] = item;
                        }
                    }
                }
            },
            triggerInput() {
                if (this.resourceValue) {
                    this.$emit('input', this.itemsDict[this.resourceValue]);
                } else {
                    this.$emit('input', null);
                }
            },
            getOptionText(option, textField) {
                return DotObject.pick(textField, option).toString();
            }
        },
        data() {
            return {
                itemsList: [],
                itemsDict: {},
                resourceValue: this.value && this.fieldObject ? this.value[this.fieldObject.item.valueField] : null
            }
        },
        watch: {
            formValue(value) {
                if (value) {
                    this.resourceValue = value[this.fieldObject.item.valueField];
                } else {
                    this.resourceValue = null;
                }
            }
        }
    }
</script>