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
                item: null
            }
        },
        methods: {
            getComponents(className = null) {
                return this.pageObject.getComponents(className);
            },
            itemLoaded(item) {
                this.item = item
            }
        }
    }
</script>