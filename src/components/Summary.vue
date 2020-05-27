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
            },
            itemObj: {
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
            await this.init();
            this.$uncle.getApp().serviceManager.getEventEmitter().$on('refreshSummaryEvent:'+this.summaryObject.name, async () => {
                await this.init();
            });
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
                if (this.summary && !this.itemObj) {
                    item = await this.summaryObject.setParams(this.params).getItem();
                } else {
                    item = this.itemObj;
                }
                this.item = item;
            },
            async init() {
                await this.loadItem();
                this.$emit('itemLoaded', this.item);
                await this.filterActionsList();
                await this.filterFieldsList();
            },
            async filterActionsList() {
                if (this.actionsList) {
                    for (let a in this.actionsList) {
                        const isHidden = await this.actionsList[a].isHidden(this.item);
                        this.actionsList[a].isHiddenCondition = isHidden;
                    }
                    this.$forceUpdate();
                }
            },
            async filterFieldsList() {
                if (this.fieldsList) {
                    for (let f in this.fieldsList) {
                        const isHidden = await this.fieldsList[f].isHidden(this.item);
                        this.fieldsList[f].isHiddenCondition = isHidden;
                    }
                    this.$forceUpdate();
                }
                if (this.groupsList) {
                    for (let g in this.groupsList) {
                        const fieldsList = this.groupsList[g].getFields();
                        for (let f in fieldsList) {
                            const isHidden = await this.groupsList[g].fields[f].isHidden(this.item);
                            this.groupsList[g].fields[f].isHiddenCondition = isHidden;
                        }
                    }
                    this.$forceUpdate();
                }
            }
        },
        watch: {
            summaryValue: function () {
                this.$emit('input', this.summaryValue);
            }
        }
    } 
</script>