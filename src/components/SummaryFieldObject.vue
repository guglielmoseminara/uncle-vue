<template>
    <div></div>
</template>

<script>
    import { ValueParserMixin } from '../index';
    
    export default {
        mixins: [ValueParserMixin],
        props: {
            fieldObject: {
                type: Object,
                required: true
            },
            value: {
                type: Object,
                required: true
            }
        },
        created() {
            this.fieldsList = this.fieldObject.getFields();
        }
    }
</script>