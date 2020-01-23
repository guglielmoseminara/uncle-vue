<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            pageObject: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                paramsObject: null
            }
        },
        methods: {
            getComponents(className = null) {
                return this.pageObject.getComponents(className);
            },
            itemLoaded(item) {
                this.paramsObject = item
            }
        }
    }
</script>