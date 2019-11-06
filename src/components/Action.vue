<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            actionItemObject: {
                type: Object,
                required: true
            },
            paramsObject: {
                type: Object
            }
        },
        methods: {
            execute() {
                const confirmFlag = this.actionItemObject.action.confirm;
                let executeFlag = true;
                if (confirmFlag) {
                    executeFlag = confirm('Are you sure?');
                }
                if (executeFlag) {
                    this.actionItemObject.action.execute();
                }
            }
        },
        computed: {
            params() {
                let actionParams = this.actionItemObject.action.getParams();
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
        }
    }
</script>