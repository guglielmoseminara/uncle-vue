<template>
    <div></div>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            fieldObject: {
                type: Object,
                required: false
            },
            validator: {
                type: String
            },
            type: {
                type: String
            },
            itemObj: {
                type: Object
            },
            showErrors: {
                type: Boolean
            },
            value: {}
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        },
        methods: {
            triggerInput(val) {
                this.$emit('input', val);
            }, 
        },
        data() {
            return {
                item: this.itemObj || {},
                showErrorsFlag: this.showErrors || false,
            }
        },
        watch: {
            itemObj(value) {
                this.item = value;
            },
            showErrors(value) {
                this.showErrorsFlag = value;
            }
        }
    }
</script>