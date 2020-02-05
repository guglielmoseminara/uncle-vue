<template>
    <div></div>
</template>

<script>
    import { SummaryFieldComponent } from './index';

    export default {
        extends: SummaryFieldComponent,
        created() {
            this.optionsList = this.fieldObject.getOptions();
        },
        methods: {
            getEnumValue(name) {
                return this.fieldObject.getItemValue(name);
            }
        }
    }
</script>