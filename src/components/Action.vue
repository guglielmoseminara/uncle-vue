<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            actionItemObject: {
                type: Object
            },
            action: {
                type: String
            },
            paramsObject: {}
        },
        created() {
            if (this.action) {
                this.actionObject = this.$uncle.getAction(this.action);
            }
            if (this.actionItemObject) {
                this.actionObject = this.actionItemObject.action;
            }
        },
        methods: {
            async execute() {
                const confirmFlag = this.actionObject.confirm;
                let executeFlag = true;
                if (confirmFlag) {
                    executeFlag = confirm('Are you sure?');
                }
                if (executeFlag) {
                    try {
                        return await this.actionObject.execute(this.getParams());
                    } catch(e) {
                        console.log(e);
                    }
                }
                this.$forceUpdate();
            },
            getParams() {
                let actionParams = this.actionObject.getParams();
                let actionParamsNames = actionParams.map((actionParam) => {
                    return actionParam.name;
                });
                let actionParamsObject = {}
                for (let paramIndex in actionParamsNames) {
                    let paramName = actionParamsNames[paramIndex];
                    if (this.paramsObject[paramName]) {
                        actionParamsObject[paramName] = this.paramsObject[paramName];
                    }
                }
                return actionParamsObject;
            }
        },
        computed: {
            params() {
                return this.getParams();
            }
        }
    }
</script>