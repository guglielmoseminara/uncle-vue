<template>
    <div></div>
</template>

<script>
    import FormField from './FormField';
    
    export default {
        extends: FormField,
        props: {
            placeholder: {
                type: String
            }
        }
    }
</script>