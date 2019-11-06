<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';

    export default {
        props: {
            fieldObject: {
                type: Object,
                required: true
            },
            type: {
                type: String,
                required: true
            },
            value: {}
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        },
        methods: {
            getItemValue(item, fieldName) {
                return DotObject.pick(fieldName, item).toString();
            },
            triggerInput(value) {
                this.$emit('input', value);
            }
        }
    }
</script>