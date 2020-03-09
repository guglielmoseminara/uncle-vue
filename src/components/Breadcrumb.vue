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
                type: Object,
                default: () => {
                    return {};
                }
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
                this.breadcrumbObject.compile(this.params);
            }
        },
        watch: {
            params() {
                this.compile();
            }
        }
    }
</script>