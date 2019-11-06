<template>
    <div></div>
</template>

<script>
    export default {
        mounted() {
        },
        methods: {
            triggerInput() {
                this.$emit('input', this.searchText);
            }
        },
        data() {
            return {
                searchText: ''
            }
        }
    } 
</script>