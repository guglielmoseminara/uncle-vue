<template>
    <div></div>
</template>

<script>
    import { FormFieldComponent } from './index';
    export default {
        extends: FormFieldComponent,
        created() {
            this.optionsList = this.fieldObject.getOptions();
        },
        data() {
            return {
                itemsList: [],
            }
        }   
    }
</script>