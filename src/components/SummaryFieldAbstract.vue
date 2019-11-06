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
            value: {
                type: [String, Number, Object, Array],
                required: true
            }
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        },
        methods: {
            getItemValue(item, fieldName) {
                return DotObject.pick(fieldName, item).toString();
            }
        }
    }
</script>