<template>

</template>

<script>
    export default {
        props: {
            modalObject: {
                type: Object,
                required: false
            }
        },
        computed: {
            modalName() {
                return this.modalObject.name;
            }
        },
        methods: {
            getComponents(className = null) {
                return this.modalObject.getComponents(className);
            }
        }
    }
</script>