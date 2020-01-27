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
            value: {
                type: String,
                required: true
            }
        }
    }
</script>