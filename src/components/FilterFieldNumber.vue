<template>
    <div></div>
</template>

<script>
    import FilterField from './FilterField';

    export default {
        extends: FilterField,
        async created() {
            if (this.fieldObject.minAction) {
                this.minValue = parseInt(await this.getFromAction(this.fieldObject.minAction));
            } else {
                this.minValue = parseInt(this.fieldObject.min);
            }
            if (this.fieldObject.maxAction) {
                this.maxValue = parseInt(await this.getFromAction(this.fieldObject.maxAction));
            } else {
                this.maxValue = parseInt(this.fieldObject.max);
            }
            this.range = {
                min: this.minValue,
                max: this.maxValue
            }
        },
        watch: {
            value: function(val) {
                this.filterValue = val;
            }
        },
        methods: {
            async getFromAction(action) {
                const maxAction = this.$uncle.getAction(action);
                const executeResult = await maxAction.execute();
                return executeResult.getData();
            }
        },
        data() {
            return {
                filterValue: this.value || 0,
                range: null
            }
        }
    }
</script>