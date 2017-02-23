var OAuth;null==OAuth&&(OAuth={}),OAuth.setProperties=function(b,c){if(null!=b&&null!=c)for(var d in c)b[d]=c[d];return b},OAuth.setProperties(OAuth,{percentEncode:function(b){if(null==b)return"";if(b instanceof Array){for(var c="",d=0;d<b.length;++b)""!=c&&(c+="&"),c+=OAuth.percentEncode(b[d]);return c}return b=encodeURIComponent(b),b=b.replace(/\!/g,"%21"),b=b.replace(/\*/g,"%2A"),b=b.replace(/\'/g,"%27"),b=b.replace(/\(/g,"%28"),b=b.replace(/\)/g,"%29")},decodePercent:function(b){return null!=b&&(b=b.replace(/\+/g," ")),decodeURIComponent(b)},getParameterList:function(b){if(null==b)return[];if("object"!=typeof b)return OAuth.decodeForm(b+"");if(b instanceof Array)return b;var c=[];for(var d in b)c.push([d,b[d]]);return c},getParameterMap:function(b){if(null==b)return{};if("object"!=typeof b)return OAuth.getParameterMap(OAuth.decodeForm(b+""));if(b instanceof Array){for(var c={},d=0;d<b.length;++d){var e=b[d][0];void 0===c[e]&&(c[e]=b[d][1])}return c}return b},getParameter:function(b,c){if(!(b instanceof Array))return OAuth.getParameterMap(b)[c];for(var d=0;d<b.length;++d)if(b[d][0]==c)return b[d][1];return null},formEncode:function(b){for(var c="",d=OAuth.getParameterList(b),e=0;e<d.length;++e){var f=d[e][1];null==f&&(f=""),""!=c&&(c+="&"),c+=OAuth.percentEncode(d[e][0])+"="+OAuth.percentEncode(f)}return c},decodeForm:function(b){for(var c=[],d=b.split("&"),e=0;e<d.length;++e){var f=d[e];if(""!=f){var h,i,g=f.indexOf("=");g<0?(h=OAuth.decodePercent(f),i=null):(h=OAuth.decodePercent(f.substring(0,g)),i=OAuth.decodePercent(f.substring(g+1))),c.push([h,i])}}return c},setParameter:function(b,c,d){var e=b.parameters;if(e instanceof Array){for(var f=0;f<e.length;++f)e[f][0]==c&&(void 0===d?e.splice(f,1):(e[f][1]=d,d=void 0));void 0!==d&&e.push([c,d])}else e=OAuth.getParameterMap(e),e[c]=d,b.parameters=e},setParameters:function(b,c){for(var d=OAuth.getParameterList(c),e=0;e<d.length;++e)OAuth.setParameter(b,d[e][0],d[e][1])},completeRequest:function(b,c){null==b.method&&(b.method="GET");var d=OAuth.getParameterMap(b.parameters);null==d.oauth_consumer_key&&OAuth.setParameter(b,"oauth_consumer_key",c.consumerKey||""),null==d.oauth_token&&null!=c.token&&OAuth.setParameter(b,"oauth_token",c.token),null==d.oauth_version&&OAuth.setParameter(b,"oauth_version","1.0"),null==d.oauth_timestamp&&OAuth.setParameter(b,"oauth_timestamp",OAuth.timestamp()),null==d.oauth_nonce&&OAuth.setParameter(b,"oauth_nonce",OAuth.nonce(6)),OAuth.SignatureMethod.sign(b,c)},setTimestampAndNonce:function(b){OAuth.setParameter(b,"oauth_timestamp",OAuth.timestamp()),OAuth.setParameter(b,"oauth_nonce",OAuth.nonce(6))},addToURL:function(b,c){if(newURL=b,null!=c){var d=OAuth.formEncode(c);if(d.length>0){var e=b.indexOf("?");e<0?newURL+="?":newURL+="&",newURL+=d}}return newURL},getAuthorizationHeader:function(b,c){for(var d='OAuth realm="'+OAuth.percentEncode(b)+'"',e=OAuth.getParameterList(c),f=0;f<e.length;++f){var g=e[f],h=g[0];0==h.indexOf("oauth_")&&(d+=","+OAuth.percentEncode(h)+'="'+OAuth.percentEncode(g[1])+'"')}return d},correctTimestampFromSrc:function(b){b=b||"oauth_timestamp";var c=document.getElementsByTagName("script");if(null!=c&&c.length){var d=c[c.length-1].src;if(d){var e=d.indexOf("?");if(!(e<0)){parameters=OAuth.getParameterMap(OAuth.decodeForm(d.substring(e+1)));var f=parameters[b];null!=f&&OAuth.correctTimestamp(f)}}}},correctTimestamp:function(b){OAuth.timeCorrectionMsec=1e3*b-(new Date).getTime()},timeCorrectionMsec:0,timestamp:function(){var b=(new Date).getTime()+OAuth.timeCorrectionMsec;return Math.floor(b/1e3)},nonce:function(b){for(var c=OAuth.nonce.CHARS,d="",e=0;e<b;++e){var f=Math.floor(Math.random()*c.length);d+=c.substring(f,f+1)}return d}}),OAuth.nonce.CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",OAuth.declareClass=function(b,c,d){var e=b[c];if(b[c]=d,null!=d&&null!=e)for(var f in e)"prototype"!=f&&(d[f]=e[f]);return d},OAuth.declareClass(OAuth,"SignatureMethod",function(){}),OAuth.setProperties(OAuth.SignatureMethod.prototype,{sign:function(b){var c=OAuth.SignatureMethod.getBaseString(b),d=this.getSignature(c);return OAuth.setParameter(b,"oauth_signature",d),d},initialize:function(b,c){var d;d=null!=c.accessorSecret&&b.length>9&&"-Accessor"==b.substring(b.length-9)?c.accessorSecret:c.consumerSecret,this.key=OAuth.percentEncode(d)+"&"+OAuth.percentEncode(c.tokenSecret)}}),OAuth.setProperties(OAuth.SignatureMethod,{sign:function(b,c){var d=OAuth.getParameterMap(b.parameters).oauth_signature_method;null!=d&&""!=d||(d="HMAC-SHA1",OAuth.setParameter(b,"oauth_signature_method",d)),OAuth.SignatureMethod.newMethod(d,c).sign(b)},newMethod:function(b,c){var d=OAuth.SignatureMethod.REGISTERED[b];if(null!=d){var e=new d;return e.initialize(b,c),e}var f=new Error("signature_method_rejected"),g="";for(var h in OAuth.SignatureMethod.REGISTERED)""!=g&&(g+="&"),g+=OAuth.percentEncode(h);throw f.oauth_acceptable_signature_methods=g,f},REGISTERED:{},registerMethodClass:function(b,c){for(var d=0;d<b.length;++d)OAuth.SignatureMethod.REGISTERED[b[d]]=c},makeSubclass:function(b){var c=OAuth.SignatureMethod,d=function(){c.call(this)};return d.prototype=new c,d.prototype.getSignature=b,d.prototype.constructor=d,d},getBaseString:function(b){var e,c=b.action,d=c.indexOf("?");if(d<0)e=b.parameters;else{e=OAuth.decodeForm(c.substring(d+1));for(var f=OAuth.getParameterList(b.parameters),g=0;g<f.length;++g)e.push(f[g])}return OAuth.percentEncode(b.method.toUpperCase())+"&"+OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(c))+"&"+OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(e))},normalizeUrl:function(b){var c=OAuth.SignatureMethod.parseUri(b),d=c.protocol.toLowerCase(),e=c.authority.toLowerCase(),f="http"==d&&80==c.port||"https"==d&&443==c.port;if(f){var g=e.lastIndexOf(":");g>=0&&(e=e.substring(0,g))}var h=c.path;return h||(h="/"),d+"://"+e+h},parseUri:function(b){for(var c={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/}},d=c.parser.strict.exec(b),e={},f=14;f--;)e[c.key[f]]=d[f]||"";return e},normalizeParameters:function(b){if(null==b)return"";for(var c=OAuth.getParameterList(b),d=[],e=0;e<c.length;++e){var f=c[e];"oauth_signature"!=f[0]&&d.push([OAuth.percentEncode(f[0])+" "+OAuth.percentEncode(f[1]),f])}d.sort(function(a,b){return a[0]<b[0]?-1:a[0]>b[0]?1:0});for(var g=[],h=0;h<d.length;++h)g.push(d[h][1]);return OAuth.formEncode(g)}}),OAuth.SignatureMethod.registerMethodClass(["PLAINTEXT","PLAINTEXT-Accessor"],OAuth.SignatureMethod.makeSubclass(function(b){return this.key})),OAuth.SignatureMethod.registerMethodClass(["HMAC-SHA1","HMAC-SHA1-Accessor"],OAuth.SignatureMethod.makeSubclass(function(b){b64pad="=";var c=b64_hmac_sha1(this.key,b);return c}));try{OAuth.correctTimestampFromSrc()}catch(a){};

function hex_sha1(a){return binb2hex(core_sha1(str2binb(a),a.length*chrsz))}function b64_sha1(a){return binb2b64(core_sha1(str2binb(a),a.length*chrsz))}function str_sha1(a){return binb2str(core_sha1(str2binb(a),a.length*chrsz))}function hex_hmac_sha1(a,b){return binb2hex(core_hmac_sha1(a,b))}function b64_hmac_sha1(a,b){return binb2b64(core_hmac_sha1(a,b))}function str_hmac_sha1(a,b){return binb2str(core_hmac_sha1(a,b))}function sha1_vm_test(){return"a9993e364706816aba3e25717850c26c9cd0d89d"==hex_sha1("abc")}function core_sha1(a,b){a[b>>5]|=128<<24-b%32,a[(b+64>>9<<4)+15]=b;for(var c=Array(80),d=1732584193,e=-271733879,f=-1732584194,g=271733878,h=-1009589776,i=0;i<a.length;i+=16){for(var j=d,k=e,l=f,m=g,n=h,o=0;o<80;o++){o<16?c[o]=a[i+o]:c[o]=rol(c[o-3]^c[o-8]^c[o-14]^c[o-16],1);var p=safe_add(safe_add(rol(d,5),sha1_ft(o,e,f,g)),safe_add(safe_add(h,c[o]),sha1_kt(o)));h=g,g=f,f=rol(e,30),e=d,d=p}d=safe_add(d,j),e=safe_add(e,k),f=safe_add(f,l),g=safe_add(g,m),h=safe_add(h,n)}return Array(d,e,f,g,h)}function sha1_ft(a,b,c,d){return a<20?b&c|~b&d:a<40?b^c^d:a<60?b&c|b&d|c&d:b^c^d}function sha1_kt(a){return a<20?1518500249:a<40?1859775393:a<60?-1894007588:-899497514}function core_hmac_sha1(a,b){var c=str2binb(a);c.length>16&&(c=core_sha1(c,a.length*chrsz));for(var d=Array(16),e=Array(16),f=0;f<16;f++)d[f]=909522486^c[f],e[f]=1549556828^c[f];var g=core_sha1(d.concat(str2binb(b)),512+b.length*chrsz);return core_sha1(e.concat(g),672)}function safe_add(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function rol(a,b){return a<<b|a>>>32-b}function str2binb(a){for(var b=Array(),c=(1<<chrsz)-1,d=0;d<a.length*chrsz;d+=chrsz)b[d>>5]|=(a.charCodeAt(d/chrsz)&c)<<32-chrsz-d%32;return b}function binb2str(a){for(var b="",c=(1<<chrsz)-1,d=0;d<32*a.length;d+=chrsz)b+=String.fromCharCode(a[d>>5]>>>32-chrsz-d%32&c);return b}function binb2hex(a){for(var b=hexcase?"0123456789ABCDEF":"0123456789abcdef",c="",d=0;d<4*a.length;d++)c+=b.charAt(a[d>>2]>>8*(3-d%4)+4&15)+b.charAt(a[d>>2]>>8*(3-d%4)&15);return c}function binb2b64(a){for(var b="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",c="",d=0;d<4*a.length;d+=3)for(var e=(a[d>>2]>>8*(3-d%4)&255)<<16|(a[d+1>>2]>>8*(3-(d+1)%4)&255)<<8|a[d+2>>2]>>8*(3-(d+2)%4)&255,f=0;f<4;f++)c+=8*d+6*f>32*a.length?b64pad:b.charAt(e>>6*(3-f)&63);return c}var hexcase=0,b64pad="",chrsz=8;


function cb(data) {
        // console.log("cb: " + JSON.stringify(data));
        // return JSON.parse(data);
        // localStorage.businessInfo = JSON.stringify(data);
}

var auth = {
    //
    // Update with your auth tokens.
    //
    consumerKey : "I7oJ3BRgydQ4IovkKDl8iQ",
    consumerSecret : "JFGNGfpvB7CaDlFm5sszeRcXZYs",
    accessToken : "kemF6W7kyo6KVJhZBcSP7rGUTYlDVq1J",
    // This example is a proof of concept, for how to use the Yelp v2 API with javascript.
    // You wouldn't actually want to expose your access token secret like this in a real application.
    accessTokenSecret : "xKH_u4wT6zXFh-smPTqpcR5cfJw",
    serviceProvider : {
        signatureMethod : "HMAC-SHA1"
    }
};

// var terms = 'food';
// var near = 'San+Francisco';

var accessor = {
    consumerSecret : auth.consumerSecret,
    tokenSecret : auth.accessTokenSecret
};

var parameters = [];
// parameters.push(['term', terms]);
// parameters.push(['location', near]);
parameters.push(['callback', 'cb']);
parameters.push(['oauth_consumer_key', auth.consumerKey]);
parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
parameters.push(['oauth_token', auth.accessToken]);
parameters.push(['oauth_signature_method', 'HMAC-SHA1']);

// var message = {
//     'action' : 'https://api.yelp.com/v2/search',
//     // 'action': 'https://api.yelp.com/v2/business/' + mammothLodging[0].yelpId,
//     'method' : 'GET',
//     'parameters' : parameters
// };


// OAuth.setTimestampAndNonce(message);
// OAuth.SignatureMethod.sign(message, accessor);

// var parameterMap = OAuth.getParameterMap(message.parameters);


// $.ajax({
//     'url' : message.action,
//     'data' : parameterMap,
//     'dataType' : 'jsonp',
//     'jsonpCallback' : 'cb',
//     'cache': true
// })
//     .done(function(data, textStatus, jqXHR) {
//             // console.log('success[' + data + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
//             console.log(data);
//             // businessInfo = JSON.stringify(data);
//             // localStorage.yelpBusinessInfo = JSON.stringify(data);
//         }
//     )
//     .fail(function(jqXHR, textStatus, errorThrown) {
//                         console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
//             }
// );
