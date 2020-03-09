<template>
    <div v-if="reset">
        <component ref="page" v-if="type == 'page' && pageObject" :is="pageObject.component" :page-object="pageObject"/>
        <component v-else-if="type == 'view' && viewObject" :is="viewObject.name" :view="view"/>
    </div>
</template>

<script>
    export default {
        props: {
            view: {
                type: String,
                required: true
            }
        },
        created() {
            this.init();
        },
        methods: {
            init() {
                this.reset = false;
                this.$nextTick(() => {
                    this.reset = true;
                    this.viewObject = this.$uncle.getView(this.view);
                    this.pageObject = this.viewObject.getPage();
                    if (this.pageObject) {
                        this.type = 'page';
                    } else {
                        this.type = 'view';
                    }
                    this.$forceUpdate();
                })
            }
        },
        data() {
            return {
                viewObject: null,
                pageObject: null,
                type: null,
                reset: true,
            }
        },
        watch: {
            view() {
                this.init();
            }
        }
    } 
</script>