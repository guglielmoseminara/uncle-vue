<template>

</template>

<script>
    export default {
        props: {
            pageObject: {
                type: Object,
                required: true
            }
        },
        methods: {
            getComponents(className = null) {
                return this.pageObject.getComponents(className);
            }
        }
    }
</script>