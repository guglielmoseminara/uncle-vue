<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            selected: {
                type: Boolean
            },
            text: {
                type: String
            },
            fieldObject: {
                type: Object
            },
            value: {}
        },
        methods: {
            triggerInput() {
                this.$emit('input', this.filterValue);
            }
        },
        data() {
            return {
                filterValue: this.value
            }
        },
        watch: {
            value: function(val) {
                this.filterValue = val;
            }
        }
    }
</script>