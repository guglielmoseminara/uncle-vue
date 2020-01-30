<template>
    <div></div>
</template>

<script>
    import { FormFieldComponent } from './index';
    import DotObject from 'dot-object';
    
    export default {
        extends: FormFieldComponent,
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
            getOptionText(option, textField) {
                return DotObject.pick(textField, option).toString();
            }
        },
        watch: {
            value: function(val) {
                this.formValue = val;
                if (!val) {
                    this.tags = [];
                } else {
                    this.createTags(val);
                }
            }
        },
        data() {
            return {
                itemsList: [],
                tags: [],
            }
        }
    }
</script>