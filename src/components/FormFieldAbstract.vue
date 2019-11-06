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
            name: {
                type: String
            },
            type: {
                type: String
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
            
        }
    }
</script>