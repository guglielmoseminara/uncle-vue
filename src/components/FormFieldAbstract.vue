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
                item: this.itemObj || {}
            }
        },
        watch: {
            itemObj(value) {
                this.item = value;
            }
        }
    }
</script>