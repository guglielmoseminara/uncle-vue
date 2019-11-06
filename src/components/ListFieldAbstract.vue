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
            row: {
                type: Object,
                required: true
            }
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        },
        methods: {
            getItemValue(fieldName) {
                return DotObject.pick(fieldName, this.row).toString();
            }
        }
    }
</script>