export default {
    setCookie: function (cname, cvalue, exsecs) {
      cvalue = JSON.stringify(cvalue)
      var expires = "expires="+this.getExpirationDate(exsecs).toUTCString();
      var cookieVal = cname + "=" + cvalue + ";" + expires + ";path=/";
      if (typeof document !== 'undefined') {
        document.cookie = cookieVal;
      } else {
        this.cookie = cookieVal;
      }
    },
  
    getExpirationDate(exsecs) {
      var d = new Date();
      d.setTime(d.getTime() + (exsecs * 1000));
      return d;
    },
  
    getCookie: function (cname) {
      var name = cname + "=";
      var ca = [];
      if (typeof document !== 'undefined') {
        ca = document.cookie.split(';');
      } else {
        ca = this.cookie.split(';');
      }
      for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          let cvalue = JSON.parse(c.substring(name.length, c.length));
          return cvalue;
        }
      }
      return undefined;
    },
    get object() {
      return document.cookie.split(';').map(function(c) {
        return c.trim().split('=').map(decodeURIComponent);
      }).reduce(function(a, b) {
        try {
          a[b[0]] = JSON.parse(b[1]);
        } catch (e) {
          a[b[0]] = b[1];
        }
        return a;
      }, {});
    },
    erase: function(cname) {
     this.setCookie(cname, '', -1);
    }
  }
  