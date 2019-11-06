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
            value: {
                type: Array,
                required: true
            }
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        },
        methods: {
            getItemValue(item, fieldName) {
                return DotObject.pick(fieldName, item).toString();
            },
            getValue(item, type, name) {
                if (type == 'text') {
                    return this.getItemValue(item, name);
                } else {
                    return item[name];
                }
            }
        }
    }
</script>