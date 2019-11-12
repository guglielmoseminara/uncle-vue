<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';
    import _ from 'lodash';

    export default {
        props: {
            list: {
                type: String
            },
            items: {
                type: Array
            },
            paramsObject: {
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
            }
        },
        async created() {
            await this.loadItems();
        },
        methods: {
            async loadItems() {
                var itemsList = [];
                if (!this.items) {
                    itemsList = await this.listObject.setParams(this.paramsObject).setOrders(this.ordersList).setPage(this.selectedPage).getItems();
                    this.totalItems = this.listObject.getTotalItems();
                } else {
                    itemsList = this.items;
                    this.totalItems = this.itemsList.length;
                }
                this.itemsList = itemsList;
            },
            getItemValue(item, fieldName) {
                return DotObject.pick(fieldName, item).toString();
            }
        },
        data() {
            return {
                itemsList: [],
                selectedPage: 1,
                totalItems: 0,
                ordersList: [],
            }
        },
        watch: {
            items: async function() {
                await this.loadItems();
            },
            selectedPage: async function() {
                await this.loadItems();
            },
            paramsObject: _.debounce(function() {
                this.loadItems();
            }, 500),
            ordersList: async function() {
                await this.loadItems();
            }
        }
    }
</script>