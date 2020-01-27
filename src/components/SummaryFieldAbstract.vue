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
            type: {
                type: String,
                required: true
            },
            value: {
                type: [String, Number, Object, Array],
                required: true
            }
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        }
    }
</script>