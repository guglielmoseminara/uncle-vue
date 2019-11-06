<template>
    <div></div>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            validator: {
                type: String
            },
            name: {
                type: String
            },
            value: {}
        },
        mounted() {
            this.$validator.validateAll();
        },
        methods: {
            triggerInput() {
                this.$emit('input', this.formValue);
            }
        },
        data() {
            return {
                formValue: this.value
            }
        },
        watch: {
            value: function(val) {
                this.formValue = val;
            }
        }
    }
</script>