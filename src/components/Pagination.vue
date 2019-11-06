<template>
    <div></div>
</template>

<script>
    export default {
        prop: ['value'],
        props: {
            paginationObject: {
                type: Object,
                required: true
            },
            total: {
                type: Number,
                required: true
            }
        },
        data() {
            return {
                selectedPage: 1,
            }
        },
        watch: {
            selectedPage: function(val) {
                this.$emit('input', val);
            }
        }
    }
</script>