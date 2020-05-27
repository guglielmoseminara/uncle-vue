<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            modalObj: {
                type: Object
            },
            modal: {
                type: String
            }
        },
        created() {
            if (this.modal) {
                this.modalObject = this.$uncle.getModal(this.modal);
            } else if(this.modalObj) {
                this.modalObject = this.modalObj;
            }
            this.$uncle.getApp().serviceManager.getEventEmitter().$on('closeModalEvent:'+this.modalObject.name, async () => {
                this.close();
            });
        },
        computed: {
            modalName() {
                return this.modalObject.name;
            }
        },
        methods: {
            getComponents(className = null) {
                return this.modalObject.getComponents(className);
            },
            close() {}
        },
        data() {
            return {
                modalObject: this.modalObj
            }
        }
    }
</script>