<template>
    <div></div>
</template>

<script>
    import DotObject from 'dot-object';
    export default {
        props: {
            fieldObject: {
                type: Object,
                required: true
            },
            value: {
                type: [String, Number],
                required: false
            }
        },
        created() {
            this.optionsList = this.fieldObject.getOptions();
        },
        data() {
            return {
                itemsList: [],
                selectValue: this.value,
            }
        },
        // computed: {
        //     selectValue: {
        //         get() { return this.value },
        //         set(selectValue) { this.$emit('input', selectValue) }
        //     }
        // },
        methods: {
            triggerInput(event) {
                console.log('----->',event);
                this.$emit('input', this.selectValue);
            },
        }
    }
</script>