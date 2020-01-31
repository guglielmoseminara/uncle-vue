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
            params: {}
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
                        return await this.actionObject.execute(this.getActionParams());
                    } catch(e) {
                        console.log(e);
                    }
                }
                this.$forceUpdate();
            },
            getActionParams() {
                let actionParams = this.actionObject.getParams();
                let actionParamsNames = actionParams.map((actionParam) => {
                    return actionParam.name;
                });
                let actionParamsObject = {}
                for (let paramIndex in actionParamsNames) {
                    let paramName = actionParamsNames[paramIndex];
                    if (this.params[paramName]) {
                        actionParamsObject[paramName] = this.params[paramName];
                    }
                }
                return actionParamsObject;
            }
        }
    }
</script>