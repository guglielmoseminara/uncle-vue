<template>
    <div></div>
</template>

<script>
    import ValueParserMixin from '../mixins/value_parser';

    export default {
        mixins: [ValueParserMixin],
        props: {
            fieldObject: {
                type: Object,
                required: true
            },
            row: {
                type: Object,
                required: true
            }
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        }
    }
</script>