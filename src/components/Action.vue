<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            action: {
                type: String
            },
            actionObj: {
                type: Object
            },
            color: {
                type: String
            },
            text: {
                type: String
            },
            icon: {
                type: String
            },
            validate: {
                type: Boolean
            },
            confirm: {
                type: Boolean
            },
            params: {
                default: () => {
                    return {}
                }
            }
        },
        created() {
            if (this.actionObj) {
                this.actionObject = this.actionObj;
            }
            if (this.action) {
                this.actionObject = this.$uncle.getAction(this.action);
            }
        },
        methods: {
            async execute() {
                const confirmFlag = this.confirm;
                let executeFlag = true;
                if (confirmFlag) {
                    await this.checkConfirm();
                } else {
                    await this.onConfirmation();
                }
                this.$forceUpdate();
            },
            async checkConfirm() {
                return true;
            },
            async onConfirmation() {
                try {
                    return await this.actionObject.execute(this.params);
                } catch(e) {
                    console.log(e);
                }
            }
        }
    }
</script>