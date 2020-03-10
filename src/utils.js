export default {
    encodeFormData: function(obj, form, namespace) {
        var fd;
        if (form) {
            fd = form;
        } else {
            fd = new FormData()
        }
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
    },  
    basename: function(url){
        return url.split('/').reverse()[0];
    },
    decodeEntities: function(string) {
        var escaped_one_to_xml_special_map = {
            '&amp;': '&',
            '&quot;': '"',
            '&lt;': '<',
            '&gt;': '>'
        };
        return string.replace(/(&quot;|&lt;|&gt;|&amp;)/g,
            function(str, item) {
                return escaped_one_to_xml_special_map[item];
        });
    },
    snake2Pascal: function(str){
        str +='';
        str = str.split('_');
        for(var i=0;i<str.length;i++){ 
            str[i] = str[i].slice(0,1).toUpperCase() + str[i].slice(1,str[i].length);
        }
        return str.join('');
    }
}