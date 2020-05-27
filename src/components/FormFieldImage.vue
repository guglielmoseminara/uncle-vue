<template>
        <div>
        </div>
</template>

<script>
    import FormField from './FormField';

    export default {
        extends: FormField,
        props: {
            hasGallery: {
                type: Boolean,
                default: true
            },
            hasModal: {
                type: Boolean
            }
        },
        data() {
            return {
                files: [],
                hasGalleryVisible: this.hasGallery,
                hasModalVisible: this.hasModal
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
                //TODO: implementare il caso di array di immagini dove formValue è un vettore
                var base_image = new Image();
                base_image.crossOrigin="anonymous";
                base_image.onload = function(){
                    var canvas = document.createElement('canvas');
                    var context = canvas.getContext('2d');
                    canvas.width = base_image.width;
                    canvas.height = base_image.height;
                    context.drawImage(base_image, 0, 0);
                    var blob = this.dataURItoBlob(canvas.toDataURL());
                    this.files.push({
                        "url": this.formValue,
                        "blob": URL.createObjectURL(blob),
                        'file': blob
                    });
                }.bind(this);
                base_image.src = this.formValue;
            },
            inputFilter: function (newFile, oldFile, prevent) {
                    if (newFile && !oldFile) {
                        if (!/\.(jpeg|jpe|jpg|gif|png|webp)$/i.test(newFile.name)) {
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
                this.files.splice(index, 1);
            }

        },

        watch: {
            files: function () {
                this.formValue = this.files[0];
                this.triggerInput();
            },
            value: function (value) {
                if (!value) {
                    this.files = [];
                }
                this.initFile();
            },
        },
        mounted() {            
        
        },
    }
</script>