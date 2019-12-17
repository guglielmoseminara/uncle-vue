export default {
    encodeFormData: function(obj, form, namespace) {
        var fd = new FormData()
        var formKey;
        for(var property in obj) {
            if(obj.hasOwnProperty && obj.hasOwnProperty(property)) {
                if(namespace) {
                    formKey = namespace + '[' + property + ']';
                } else {
                    formKey = property;
                }
                if(obj[property] instanceof File || obj[property] instanceof Blob) {
                    fd.append(formKey, obj[property]);
                }
                else if(typeof obj[property] === 'object' ) {
                    this.encodeFormData(obj[property], fd, formKey);
                }
                else if (typeof obj[property] === 'boolean') {
                    fd.append(formKey, obj[property]?1:0);
                }
                else {
                    fd.append(formKey, obj[property]);
                }
            }
        }
        return fd;
    },
    decodeFormData: function(formData) {
        var object = {};
        formData.forEach(function(value, key){
            object[key] = value;
        });
        return object;
    }
}