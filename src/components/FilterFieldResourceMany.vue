<template>
    <div></div>
</template>

<script>
    import { FilterFieldComponent } from './index';
    import DotObject from 'dot-object';
    
    export default {
        extends: FilterFieldComponent,
        methods: {
            async loadItems(search = null) {
                var itemsList = [];
                if (!this.items) {
                    itemsList = await this.fieldObject.getItems(search);
                } else {
                    itemsList = this.items;
                }
                this.itemsList = itemsList;
            },
            triggerInput() {
                if (this.filterValue) {
                    this.$emit('input', this.filterValue);
                }
            },
            getOptionText(option, textField) {
                return DotObject.pick(textField, option).toString();
            }
        },
        watch: {
            value: function(val) {
                this.filterValue = val;
                if (!val) {
                    this.tags = [];
                } else if (Array.isArray(val)) {
                    this.createTags(val);
                }
            }
        },
        data() {
            return {
                itemsList: [],
                tags: [],
                filterValue: this.value,
            }
        }
    }
</script>