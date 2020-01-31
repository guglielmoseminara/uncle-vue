<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            breadcrumb: {
                type: String
            },
            params: {
                type: Object
            }
        },
        created() {
            if (this.breadcrumb) {
                this.breadcrumbObject = this.$uncle.getBreadcrumb(this.breadcrumb);
                this.compile();
            }
        },
        data() {
            return {
                breadcrumbObject: {}
            }
        },
        methods: {
            compile() {
                if (this.params) {
                    this.breadcrumbObject.compile(this.params);
                }
            }
        },
        watch: {
            params(value) {
                this.compile();
            }
        }
    }
</script>