<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            fieldObject: {
                type: Object,
                required: true
            },
            value: {
                type: [String, Number],
                required: true
            }
        },
        created() {
            this.optionsList = this.fieldObject.getOptions();
        },
        methods: {
            getItemValue(name) {
                return this.fieldObject.getItemValue(name);
            }
        }
    }
</script>