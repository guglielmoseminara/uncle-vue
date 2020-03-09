<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            pageObject: {
                type: Object
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {},
            getComponents(className = null) {
                return this.pageObject ? this.pageObject.getComponents(className) : [];
            }
        },
        watch: {
            pageObject() {
                this.init();
            }
        }
    }
</script>