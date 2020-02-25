<template>
    <div></div>
</template>

<script>
    import ValueParserMixin from '../mixins/value_parser';
    import _ from 'lodash';

    export default {
        mixins: [ValueParserMixin],
        props: {
            list: {
                type: String
            },
            items: {
                type: Array
            },
            params: {
                type: Object
            } 
        },
        computed: {
            listObject() {
                return this.list ? this.$uncle.getList(this.list) : null;
            },
            fieldsList() {
                return this.list ? this.listObject.getFields() : [];
            },
            headersList() {
                return this.fieldsList.map((field) => {
                    return {
                        name: field.name,
                        text: field.text,
                        type: field.type,
                        sortable: field.sortable ? true : false,
                    };
                });
            },
            paginationObject() {
                return this.list ? this.listObject.getPagination() : null;
            },
            actionsList() {
                return this.list ? this.listObject.getActions() : null;
            },
            hasActionsList() {
                return this.fieldsList.find((field) => {
                    return field.type == 'actions-list';
                });
            }
        },
        async created() {
            this.$uncle.getApp().serviceManager.getEventEmitter().$on('refreshListEvent', () => {
                this.loadItems();
                this.initializeSelectedIndexes();
            });
            await this.loadItems();
        },
        methods: {
            async loadItems() {
                var itemsList = [];
                this.loading = true;
                if (!this.items) {
                    itemsList = await this.listObject.setParams(this.params).setOrders(this.ordersList).setPage(this.selectedPage).getItems();
                    this.totalItems = this.listObject.getTotalItems();
                } else {
                    itemsList = this.items;
                    this.totalItems = this.itemsList.length;
                }
                this.itemsList = itemsList;
                this.loading = false;
                this.$emit('itemsLoaded', this.itemsList);
            },
            initializeSelectedIndexes(value = false) {
                if (this.itemsList.length > 0 && this.listObject && this.listObject.selectable) {
                    for (let listIndex in this.itemsList) {
                        this.selectedIndexes[this.itemsList[listIndex][this.listObject.selectable_id]] = value;
                    }
                }
                this.appendSelectedToParams();
            },
            selectIndex(id, value) {
                this.selectedIndexes[id] = value;
                this.appendSelectedToParams();
            },
            setSelectedAllValue(value) {
                this.selectedAll = value;
            },
            appendSelectedToParams() {
                if (this.params) {
                    this.params.ids = Object.keys(this.selectedIndexes).filter((key) => {
                        return this.selectedIndexes[key] ? key : false
                    });
                }
            }
        },
        data() {
            return {
                itemsList: [],
                selectedPage: 1,
                totalItems: 0,
                ordersList: [],
                selectedAll: false,
                selectedIndexes: {},
                loading: false,
            }
        },
        watch: {
            items: async function() {
                await this.loadItems();
            },
            selectedPage: async function() {
                await this.loadItems();
            },
            params: _.debounce(function() {
                this.selectedPage = 1;
                this.loadItems();
            }, 500),
            ordersList: async function() {
                this.selectedPage = 1;
                await this.loadItems();
            },
            itemsList: function() {
                this.initializeSelectedIndexes();
            },
            selectedAll: function(val) {
                this.initializeSelectedIndexes(val);
            }
        },
    }
</script>