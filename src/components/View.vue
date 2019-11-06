<template>

</template>

<script>
    export default {
        props: {
            view: {
                type: String,
                required: true
            }
        },
        mounted() {
            this.viewObject = this.$uncle.getView(this.view);
            this.pageObject = this.viewObject.getPage();
        },
        data() {
            return {
                viewObject: {},
                pageObject: {},
            }
        }
    } 
</script>