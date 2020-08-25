<template>
        <div>
        </div>
</template>

<script>
    import FormField from './FormField';

    export default {
        extends: FormField,
        data() {
            return {
                file: null,
                files: []
            }
        },
        methods: {
            dataURItoBlob(dataURI) {
                var byteString;
                if (dataURI.split(',')[0].indexOf('base64') >= 0)
                    byteString = atob(dataURI.split(',')[1]);
                else
                    byteString = unescape(dataURI.split(',')[1]);

                var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

                var ia = new Uint8Array(byteString.length);
                for (var i = 0; i < byteString.length; i++) {
                    ia[i] = byteString.charCodeAt(i);
                }

                return new Blob([ia], {type:mimeString});
            },
            initFile() {
                this.file = {
                    "url": this.formValue,
                };
                this.files = [this.file];
                this.triggerInput();
            },
            inputFilter: function (newFile, oldFile, prevent) {
                    if (newFile && !oldFile) {
                        if (!/\.(pdf)$/i.test(newFile.name)) {
                        return prevent()
                    }
                }
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }
            },
            deleteFile(index) {
                this.file = null;
            }

        },
        created() {            
            this.initFile();  
        },
    }
</script>