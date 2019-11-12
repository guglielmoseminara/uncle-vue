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
                required: false
            }
        },
        created() {
            this.optionsList = this.fieldObject.getOptions();
        },
        data() {
            return {
                itemsList: [],
                selectValue: this.value,
            }
        },
        methods: {
            triggerInput() {
                this.$emit('input', this.selectValue);
            },
        }
    }
</script>