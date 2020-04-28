<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            nav: {
                type: String,
                required: true
            }
        },
        created() {
            this.navObject = this.$uncle.getNav(this.nav);
        },
        data() {
            return {
                navObject: []
            }
        }
    } 
</script>