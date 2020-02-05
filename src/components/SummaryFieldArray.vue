<template>
    <div></div>
</template>

<script>
    import { SummaryFieldComponent } from './index';

    export default {
        extends: SummaryFieldComponent,
        created() {
            if (this.fieldObject) {
                this.fieldsList = this.fieldObject.getFields();
            }
        }
    }
</script>