<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            labelObject: {
                type: Object,
                required: true
            },
            value: {
                type: [String, Number, Object, Array],
                required: true
            }
        }
    }
</script>