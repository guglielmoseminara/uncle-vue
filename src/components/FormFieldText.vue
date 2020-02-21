<template>
    <div></div>
</template>

<script>
    import FormField from './FormField';
    import _ from 'lodash'

    export default {
        extends: FormField,
        methods: {
            triggerInput() {
                _.debounce(() => {
                    this.$emit('input', this.formValue);
                }, 200)();
            }
        }
    }
</script>