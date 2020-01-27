<template>
    <div></div>
</template>

<script>
    export default {
        inject: ['$validator'],
        props: {
            fieldObject: {
                type: Object
            },
            value: {}
        },
        mounted() {
            if (this.fieldObject && this.fieldObject.getForm()) {
                this.$validator.validateAll(this.fieldObject.getForm().name);
            }
        },
        methods: {
            triggerInput() {
                this.$emit('input', this.formValue);
            },
            getIcon() {
                return this.$iconsProvider.get(this.fieldObject.icon);
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