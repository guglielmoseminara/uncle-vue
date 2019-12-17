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
            fieldObject: {
                type: Object
            },
            value: {}
        },
        mounted() {
            this.$validator.validateAll();
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