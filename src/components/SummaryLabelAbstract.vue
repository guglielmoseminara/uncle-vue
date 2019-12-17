<template>
    <div></div>
</template>

<script>
    export default {
        props: {
            labelObject: {
                type: Object
            },
            type: {
                type: String,
                required: true
            },
            value: {
                type: [String, Number, Object, Array],
            }
        }
    }
</script>