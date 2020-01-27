<template>
    <div></div>
</template>

<script>
    import { FormFieldComponent } from './index';
    
    export default {
        extends: FormFieldComponent,
        props: {
            placeholder: {
                type: String
            }
        }
    }
</script>