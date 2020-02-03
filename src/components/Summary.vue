<template>
    <div></div>
</template>

<script>
    import ValueParserMixin from '../mixins/value_parser';
    
    export default {
        mixins: [ValueParserMixin],
        props: {
            summary: {
                type: String
            },
            params: {
                type: Object
            }
        },
        prop: ['value'],
        async created() {
            if (this.summary) {
                this.summaryObject = this.$uncle.getSummary(this.summary);
                this.fieldsList = this.summaryObject.getFields();
                this.groupsList = this.summaryObject.getGroups();
                this.actionsList = this.summaryObject.getActions();
                this.initValue();
            }
            await this.loadItem();
            this.$emit('itemLoaded', this.item);
        },
        data() {
            return {
                summaryValue: this.value || {},
                summaryObject: {},
                fieldsList: [],
                groupsList: [],
                actionsList: [],
                item: null,
            }
        },
        methods: {
            initValue() {
                let summaryValue = {};
                for (let f in this.fieldsList) {
                    let field = this.fieldsList[f];
                    summaryValue[field.name] = field.getDefault();
                }
                this.summaryValue = summaryValue;
            },
            triggerInput() {
                this.$emit('input', this.summaryValue);
            },
            async loadItem() {
                var item = {};
                if (!this.item) {
                    item = await this.summaryObject.setParams(this.params).getItem();
                } else {
                    item = this.item;
                }
                this.item = item;
            }
        },
        watch: {
            summaryValue: function () {
                this.$emit('input', this.summaryValue);
            }
        }
    } 
</script>