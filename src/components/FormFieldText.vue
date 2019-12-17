<template>
    <div></div>
</template>

<script>
    import { FormField } from './index';
    
    export default {
        extends: FormField,
        props: {
            placeholder: {
                type: String
            }
        }
    }
</script>