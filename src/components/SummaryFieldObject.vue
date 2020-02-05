<template>
    <div></div>
</template>

<script>
    import { SummaryFieldComponent } from './index';
    
    export default {
        extends: SummaryFieldComponent,
        props: {
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