<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            breadcrumb: {
                type: String
            },
            paramsObject: {
                type: Object
            }
        },
        created() {
            if (this.breadcrumb) {
                this.breadcrumbObject = this.$uncle.getBreadcrumb(this.breadcrumb);
                if (this.paramsObject) {
                    this.breadcrumbObject.compile(this.paramsObject);
                }
            }
        },
        data() {
            return {
                breadcrumbObject: {}
            }
        }
    }
</script>