<template>
    <div></div>
</template>

<script>
    import { FilterFieldComponent } from './index';
    import DotObject from 'dot-object';

    export default {
        extends: FilterFieldComponent,
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
                if (this.filterValue) {
                    this.$emit('input', this.itemsList.find((el) => {
                        return DotObject.pick(this.fieldObject.item.valueField, el) == this.filterValue;
                    }));
                }
            },
            getOptionText(option, textField) {
                return DotObject.pick(textField, option).toString();
            }
        },
        watch: {
            value: function(val) {
                this.filterValue = val;
            }
        },
        data() {
            return {
                itemsList: [],
                filterValue: this.value,
            }
        }
    }
</script>