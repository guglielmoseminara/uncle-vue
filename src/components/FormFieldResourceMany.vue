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
            },
            initTags() {
                if (!this.formValue) {
                    this.tags = [];
                } else {
                    this.createTags(this.formValue);
                }
            }
        },
        created() {
            this.initTags();
        },
        watch: {
            formValue: function(val) {
                this.initTags();
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