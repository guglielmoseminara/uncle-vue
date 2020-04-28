<template>
    <div v-if="reset">
        <component ref="component" v-if="type == 'page' && pageObject" :is="pageObject.component" :page-object="pageObject"/>
        <component ref="component" v-else-if="type == 'view' && viewObject" :is="viewObject.name" :view="view"/>
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
        async asyncData(context) {
            const view = context.uncle.getRoute(context.route.name).view;
            const page = view.getPage();
            if (page) {
                const components = page.getComponents();
                for (let c = 0; c < components.length; c++) {
                    let component = components[c];
                    component.initSSR && await components[c].initSSR();
                }
            }
        },
        methods: {
            init() {
                if (typeof window !== 'undefined') {
                    this.reset = false;
                    this.$nextTick(() => {
                        this.reset = true;
                        this.render();
                    })
                } else {
                    this.render();                    
                }
            },
            render() {
                this.viewObject = this.$uncle.getView(this.view);
                this.pageObject = this.viewObject.getPage();
                if (this.pageObject && this.pageObject.component) {
                    this.type = 'page';
                } else {
                    this.type = 'view';
                }
                this.$forceUpdate();
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