<template>
    <div></div>
</template>

<script>
    import moment from 'moment';
    import DotObject from 'dot-object';

    export default {
        props: {
            fieldObject: {
                type: Object,
                required: true
            },
            value: {
                type: Number,
                required: true
            }
        },
        methods: {
            getFormattedDatetime() {
                let mom;
                switch(this.fieldObject.format) {
                    case 'hh:mm':
                        mom = moment().startOf('day').add(this.value, 'minutes').format('HH:mm')
                        break;
                }
                return mom;
            }
        },
    }
</script>