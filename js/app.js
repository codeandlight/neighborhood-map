// Menu Toggle
// $("#menu-toggle").click(function(e) {
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled");
//     $("#wrapper").find("span").toggleClass('glyphicon-menu-right').toggleClass('glyphicon-menu-left');
// });
// function hex_sha1(e){return binb2hex(core_sha1(str2binb(e),e.length*chrsz))}function b64_sha1(e){return binb2b64(core_sha1(str2binb(e),e.length*chrsz))}function str_sha1(e){return binb2str(core_sha1(str2binb(e),e.length*chrsz))}function hex_hmac_sha1(e,t){return binb2hex(core_hmac_sha1(e,t))}function b64_hmac_sha1(e,t){return binb2b64(core_hmac_sha1(e,t))}function str_hmac_sha1(e,t){return binb2str(core_hmac_sha1(e,t))}function sha1_vm_test(){return"a9993e364706816aba3e25717850c26c9cd0d89d"==hex_sha1("abc")}function core_sha1(e,t){e[t>>5]|=128<<24-t%32,e[(t+64>>9<<4)+15]=t;for(var r=Array(80),n=1732584193,a=-271733879,o=-1732584194,u=271733878,c=-1009589776,h=0;h<e.length;h+=16){for(var s=n,i=a,f=o,l=u,m=c,d=0;80>d;d++){16>d?r[d]=e[h+d]:r[d]=rol(r[d-3]^r[d-8]^r[d-14]^r[d-16],1);var A=safe_add(safe_add(rol(n,5),sha1_ft(d,a,o,u)),safe_add(safe_add(c,r[d]),sha1_kt(d)));c=u,u=o,o=rol(a,30),a=n,n=A}n=safe_add(n,s),a=safe_add(a,i),o=safe_add(o,f),u=safe_add(u,l),c=safe_add(c,m)}return Array(n,a,o,u,c)}function sha1_ft(e,t,r,n){return 20>e?t&r|~t&n:40>e?t^r^n:60>e?t&r|t&n|r&n:t^r^n}function sha1_kt(e){return 20>e?1518500249:40>e?1859775393:60>e?-1894007588:-899497514}function core_hmac_sha1(e,t){var r=str2binb(e);r.length>16&&(r=core_sha1(r,e.length*chrsz));for(var n=Array(16),a=Array(16),o=0;16>o;o++)n[o]=909522486^r[o],a[o]=1549556828^r[o];var u=core_sha1(n.concat(str2binb(t)),512+t.length*chrsz);return core_sha1(a.concat(u),672)}function safe_add(e,t){var r=(65535&e)+(65535&t),n=(e>>16)+(t>>16)+(r>>16);return n<<16|65535&r}function rol(e,t){return e<<t|e>>>32-t}function str2binb(e){for(var t=Array(),r=(1<<chrsz)-1,n=0;n<e.length*chrsz;n+=chrsz)t[n>>5]|=(e.charCodeAt(n/chrsz)&r)<<32-chrsz-n%32;return t}function binb2str(e){for(var t="",r=(1<<chrsz)-1,n=0;n<32*e.length;n+=chrsz)t+=String.fromCharCode(e[n>>5]>>>32-chrsz-n%32&r);return t}function binb2hex(e){for(var t=hexcase?"0123456789ABCDEF":"0123456789abcdef",r="",n=0;n<4*e.length;n++)r+=t.charAt(e[n>>2]>>8*(3-n%4)+4&15)+t.charAt(e[n>>2]>>8*(3-n%4)&15);return r}function binb2b64(e){for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",r="",n=0;n<4*e.length;n+=3)for(var a=(e[n>>2]>>8*(3-n%4)&255)<<16|(e[n+1>>2]>>8*(3-(n+1)%4)&255)<<8|e[n+2>>2]>>8*(3-(n+2)%4)&255,o=0;4>o;o++)r+=8*n+6*o>32*e.length?b64pad:t.charAt(a>>6*(3-o)&63);return r}function cb(e){}var OAuth;null==OAuth&&(OAuth={}),OAuth.setProperties=function(e,t){if(null!=e&&null!=t)for(var r in t)e[r]=t[r];return e},OAuth.setProperties(OAuth,{percentEncode:function(e){if(null==e)return"";if(e instanceof Array){for(var t="",r=0;r<e.length;++e)""!=t&&(t+="&"),t+=OAuth.percentEncode(e[r]);return t}return e=encodeURIComponent(e),e=e.replace(/\!/g,"%21"),e=e.replace(/\*/g,"%2A"),e=e.replace(/\'/g,"%27"),e=e.replace(/\(/g,"%28"),e=e.replace(/\)/g,"%29")},decodePercent:function(e){return null!=e&&(e=e.replace(/\+/g," ")),decodeURIComponent(e)},getParameterList:function(e){if(null==e)return[];if("object"!=typeof e)return OAuth.decodeForm(e+"");if(e instanceof Array)return e;var t=[];for(var r in e)t.push([r,e[r]]);return t},getParameterMap:function(e){if(null==e)return{};if("object"!=typeof e)return OAuth.getParameterMap(OAuth.decodeForm(e+""));if(e instanceof Array){for(var t={},r=0;r<e.length;++r){var n=e[r][0];void 0===t[n]&&(t[n]=e[r][1])}return t}return e},getParameter:function(e,t){if(!(e instanceof Array))return OAuth.getParameterMap(e)[t];for(var r=0;r<e.length;++r)if(e[r][0]==t)return e[r][1];return null},formEncode:function(e){for(var t="",r=OAuth.getParameterList(e),n=0;n<r.length;++n){var a=r[n][1];null==a&&(a=""),""!=t&&(t+="&"),t+=OAuth.percentEncode(r[n][0])+"="+OAuth.percentEncode(a)}return t},decodeForm:function(e){for(var t=[],r=e.split("&"),n=0;n<r.length;++n){var a=r[n];if(""!=a){var o,u,c=a.indexOf("=");0>c?(o=OAuth.decodePercent(a),u=null):(o=OAuth.decodePercent(a.substring(0,c)),u=OAuth.decodePercent(a.substring(c+1))),t.push([o,u])}}return t},setParameter:function(e,t,r){var n=e.parameters;if(n instanceof Array){for(var a=0;a<n.length;++a)n[a][0]==t&&(void 0===r?n.splice(a,1):(n[a][1]=r,r=void 0));void 0!==r&&n.push([t,r])}else n=OAuth.getParameterMap(n),n[t]=r,e.parameters=n},setParameters:function(e,t){for(var r=OAuth.getParameterList(t),n=0;n<r.length;++n)OAuth.setParameter(e,r[n][0],r[n][1])},completeRequest:function(e,t){null==e.method&&(e.method="GET");var r=OAuth.getParameterMap(e.parameters);null==r.oauth_consumer_key&&OAuth.setParameter(e,"oauth_consumer_key",t.consumerKey||""),null==r.oauth_token&&null!=t.token&&OAuth.setParameter(e,"oauth_token",t.token),null==r.oauth_version&&OAuth.setParameter(e,"oauth_version","1.0"),null==r.oauth_timestamp&&OAuth.setParameter(e,"oauth_timestamp",OAuth.timestamp()),null==r.oauth_nonce&&OAuth.setParameter(e,"oauth_nonce",OAuth.nonce(6)),OAuth.SignatureMethod.sign(e,t)},setTimestampAndNonce:function(e){OAuth.setParameter(e,"oauth_timestamp",OAuth.timestamp()),OAuth.setParameter(e,"oauth_nonce",OAuth.nonce(6))},addToURL:function(e,t){if(newURL=e,null!=t){var r=OAuth.formEncode(t);if(r.length>0){var n=e.indexOf("?");0>n?newURL+="?":newURL+="&",newURL+=r}}return newURL},getAuthorizationHeader:function(e,t){for(var r='OAuth realm="'+OAuth.percentEncode(e)+'"',n=OAuth.getParameterList(t),a=0;a<n.length;++a){var o=n[a],u=o[0];0==u.indexOf("oauth_")&&(r+=","+OAuth.percentEncode(u)+'="'+OAuth.percentEncode(o[1])+'"')}return r},correctTimestampFromSrc:function(e){e=e||"oauth_timestamp";var t=document.getElementsByTagName("script");if(null!=t&&t.length){var r=t[t.length-1].src;if(r){var n=r.indexOf("?");if(!(0>n)){parameters=OAuth.getParameterMap(OAuth.decodeForm(r.substring(n+1)));var a=parameters[e];null!=a&&OAuth.correctTimestamp(a)}}}},correctTimestamp:function(e){OAuth.timeCorrectionMsec=1e3*e-(new Date).getTime()},timeCorrectionMsec:0,timestamp:function(){var e=(new Date).getTime()+OAuth.timeCorrectionMsec;return Math.floor(e/1e3)},nonce:function(e){for(var t=OAuth.nonce.CHARS,r="",n=0;e>n;++n){var a=Math.floor(Math.random()*t.length);r+=t.substring(a,a+1)}return r}}),OAuth.nonce.CHARS="0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz",OAuth.declareClass=function(e,t,r){var n=e[t];if(e[t]=r,null!=r&&null!=n)for(var a in n)"prototype"!=a&&(r[a]=n[a]);return r},OAuth.declareClass(OAuth,"SignatureMethod",function(){}),OAuth.setProperties(OAuth.SignatureMethod.prototype,{sign:function(e){var t=OAuth.SignatureMethod.getBaseString(e),r=this.getSignature(t);return OAuth.setParameter(e,"oauth_signature",r),r},initialize:function(e,t){var r;r=null!=t.accessorSecret&&e.length>9&&"-Accessor"==e.substring(e.length-9)?t.accessorSecret:t.consumerSecret,this.key=OAuth.percentEncode(r)+"&"+OAuth.percentEncode(t.tokenSecret)}}),OAuth.setProperties(OAuth.SignatureMethod,{sign:function(e,t){var r=OAuth.getParameterMap(e.parameters).oauth_signature_method;null!=r&&""!=r||(r="HMAC-SHA1",OAuth.setParameter(e,"oauth_signature_method",r)),OAuth.SignatureMethod.newMethod(r,t).sign(e)},newMethod:function(e,t){var r=OAuth.SignatureMethod.REGISTERED[e];if(null!=r){var n=new r;return n.initialize(e,t),n}var a=new Error("signature_method_rejected"),o="";for(var u in OAuth.SignatureMethod.REGISTERED)""!=o&&(o+="&"),o+=OAuth.percentEncode(u);throw a.oauth_acceptable_signature_methods=o,a},REGISTERED:{},registerMethodClass:function(e,t){for(var r=0;r<e.length;++r)OAuth.SignatureMethod.REGISTERED[e[r]]=t},makeSubclass:function(e){var t=OAuth.SignatureMethod,r=function(){t.call(this)};return r.prototype=new t,r.prototype.getSignature=e,r.prototype.constructor=r,r},getBaseString:function(e){var t,r=e.action,n=r.indexOf("?");if(0>n)t=e.parameters;else{t=OAuth.decodeForm(r.substring(n+1));for(var a=OAuth.getParameterList(e.parameters),o=0;o<a.length;++o)t.push(a[o])}return OAuth.percentEncode(e.method.toUpperCase())+"&"+OAuth.percentEncode(OAuth.SignatureMethod.normalizeUrl(r))+"&"+OAuth.percentEncode(OAuth.SignatureMethod.normalizeParameters(t))},normalizeUrl:function(e){var t=OAuth.SignatureMethod.parseUri(e),r=t.protocol.toLowerCase(),n=t.authority.toLowerCase(),a="http"==r&&80==t.port||"https"==r&&443==t.port;if(a){var o=n.lastIndexOf(":");o>=0&&(n=n.substring(0,o))}var u=t.path;return u||(u="/"),r+"://"+n+u},parseUri:function(e){for(var t={key:["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],parser:{strict:/^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/}},r=t.parser.strict.exec(e),n={},a=14;a--;)n[t.key[a]]=r[a]||"";return n},normalizeParameters:function(e){if(null==e)return"";for(var t=OAuth.getParameterList(e),r=[],n=0;n<t.length;++n){var a=t[n];"oauth_signature"!=a[0]&&r.push([OAuth.percentEncode(a[0])+" "+OAuth.percentEncode(a[1]),a])}r.sort(function(e,t){return e[0]<t[0]?-1:e[0]>t[0]?1:0});for(var o=[],u=0;u<r.length;++u)o.push(r[u][1]);return OAuth.formEncode(o)}}),OAuth.SignatureMethod.registerMethodClass(["PLAINTEXT","PLAINTEXT-Accessor"],OAuth.SignatureMethod.makeSubclass(function(e){return this.key})),OAuth.SignatureMethod.registerMethodClass(["HMAC-SHA1","HMAC-SHA1-Accessor"],OAuth.SignatureMethod.makeSubclass(function(e){b64pad="=";var t=b64_hmac_sha1(this.key,e);return t}));try{OAuth.correctTimestampFromSrc()}catch(a){}var hexcase=0,b64pad="",chrsz=8,auth={consumerKey:"I7oJ3BRgydQ4IovkKDl8iQ",consumerSecret:"JFGNGfpvB7CaDlFm5sszeRcXZYs",accessToken:"kemF6W7kyo6KVJhZBcSP7rGUTYlDVq1J",accessTokenSecret:"xKH_u4wT6zXFh-smPTqpcR5cfJw",serviceProvider:{signatureMethod:"HMAC-SHA1"}},accessor={consumerSecret:auth.consumerSecret,tokenSecret:auth.accessTokenSecret},parameters=[];parameters.push(["callback","cb"]),parameters.push(["oauth_consumer_key",auth.consumerKey]),parameters.push(["oauth_consumer_secret",auth.consumerSecret]),parameters.push(["oauth_token",auth.accessToken]),parameters.push(["oauth_signature_method","HMAC-SHA1"]);

/*
Google Maps Javascript
*/

// List of Mammoth Lodging Locations
var mammothLodging = [
    { name: 'Cinnamon Bear Inn', yelpId: 'cinnamon-bear-inn-mammoth-lakes', location: { lat: 37.646934, lng: -118.971888 }},
    { name: 'Quality Inn', yelpId: 'quality-inn-near-mammoth-mountain-ski-resort-mammoth-lakes', location: { lat: 37.648242, lng: -118.975139 }},
    { name: 'Innsbruck Lodge', yelpId: 'innsbruck-lodge-mammoth-lakes', location: { lat: 37.651181, lng: -118.982188 }},
    { name: 'Best Western Plus High Sierra Hotel', yelpId: 'best-western-plus-high-sierra-hotel-mammoth-lakes-3', location: { lat: 37.648938, lng: -118.969333 }},
    { name: 'Rodeway Inn Wildwood Inn', yelpId: 'rodeway-inn-wildwood-inn-mammoth-lakes', location: { lat: 37.649133, lng: -118.976446 }},
    { name: 'M Inn Mammoth', yelpId: 'the-m-inn-mammoth-mammoth-lakes', location: { lat: 37.647426, lng: -118.976800 }},
    { name: 'Shilo Inn Suites', yelpId: 'shilo-inn-suites-hotel-mammoth-lakes-mammoth-lakes', location: { lat: 37.646093, lng: -118.964614 }},
    { name: 'Travelodge', yelpId: 'travelodge-mammoth-lakes-mammoth-lakes', location: { lat: 37.649304, lng: -118.974173 }},
    { name: 'Alpenhof Lodge', yelpId: 'alpenhof-lodge-mammoth-lakes', location: { lat: 37.650034, lng: -118.983540 }}
];

// Initialize map variable
var map;

// Initialize markers array
var markers = [];

// Create bounds object to adjust the boundaries of the map
var bounds;

// Variables placed in the global scope to ensure it only has one value at all times
var infowindow, infoWindowOptions, mapCenter;

var infowindowContentModel = function(info) {

    console.log("info received: ");
    var name = '<div class="yelpInfoWindow"><div id="yelpBusinessName">' + info.name + '/<div>';
    var businessInfo = '<div id="yelpBusinessInfo"><div class="yelpInfo"><img id="yelpImg" src="' + info.image_url + '"alt="' + info.name + '"></div';
    var rating  = '<div><img id="yelpRatings" src="' + info.rating_img_url + '" alt="rating: ' + info.rating + '"</div>';
    var phone = '<div id="yepPhone"><span class="glyphicon glyphicon-phone-alt"></span> <a href="tel:' + info.phone + '">' + info.display_phone + '</a></div>';
    var address = '<span id="yelpBusinessAddress">' + info.location.display_address + '</span><br>';
    var snippet = '<span id="yelpSnippet">' + info.snippet_text + '</span><br>';
    var webpage = '<span><a href="' + info.url + '" target="_blank" alt="Yelp Link">See more reviews on Yelp.com...</a></span></div></div>';
    // '<div class="yelpInfoWindow">' +
    //                                     '<div id="yelpBusinessName">' + businessInfo.name + '</div>' +
    //                                     '<div id="yelpBusinessInfo">' +
    //                                     '<div class="yelpInfo"><img id="yelpImg" src="' + businessInfo.image_url + '" alt="' + businessInfo.name + '"></div>' +
    //                                     '<div><img id="yelpRatings" src="' + businessInfo.rating_img_url + '" alt="rating: ' + businessInfo.rating + '"></div>' +
    //                                     '<div id="yelpPhone"><span class="glyphicon glyphicon-phone-alt"></span> <a href="tel:' + businessInfo.phone + '">' + businessInfo.display_phone + '</a></div>' +
    //                                     '<span id="yelpBusinessAddress">' + businessInfo.location.display_address + '</span><br>' +
    //                                     '<span id="yelpSnippet">' + businessInfo.snippet_text + '</span><br>' +
    //                                     '<span><a href="' + businessInfo.url + '" target="_blank" alt="Yelp Link">See more reviews on Yelp.com</a></span>' +
    //                                     '</div></div>';

    var infoString = name + businessInfo + rating + phone + address + snippet + webpage;
    console.log(infoString);
    infowindow.setContent( infoString );
};

/*
** This is the model for the places search
*/

var searchResultModel = function(result) {
    var self = this;

    self.location = ko.observable(result.geometry.location);
    self.name = ko.observable(result.name);
    self.icon = ko.observable(result.icon);
    self.vicinity = ko.observable(result.vicinity);
};

/*
** This is the model for the markers that are placed on the Google Map and in the dropdown menu.
*/
var markerModel = function(hotel) {

    var self = this;

    // Variables that define the custom marker look and calls makeMarkerIcon() to create them
    var defaultMarker = makeMarkerIcon('76F5F3', '360CF3');
    var highlightedMarker = makeMarkerIcon('360CF3', '76F5F3');

    self.name = ko.observable(hotel.name);
    self.yelpId = ko.observable(hotel.yelpId);
    self.location = ko.observable(hotel.location);

    self.marker = ko.observable(new google.maps.Marker({
        position: this.location(),
        title: this.name(),
        map: map,
        icon: defaultMarker,
        animation: google.maps.Animation.DROP
    }));

    // Add marker location to bounds to resize map and fit all markers
    bounds.extend(self.location());

    // Add event listeners
    self.marker().addListener('mouseover', function() {
        this.setIcon(highlightedMarker);
    });
    self.marker().addListener('mouseout', function() {
        this.setIcon(defaultMarker);
    });

    //
    self.marker().addListener('click', function() {
        populateInfoWindow();
    });


    self.previewOn = function() {
        self.marker().setIcon(highlightedMarker);
        self.marker().setAnimation(google.maps.Animation.BOUNCE);
    };

    self.previewOut = function() {
        self.marker().setIcon(defaultMarker);
        self.marker().setAnimation(-1);
    };

    self.selectMarker = function() {
        map.panTo(self.location());
        map.setZoom(16);
        self.marker().setIcon(highlightedMarker);
        self.marker().setAnimation(google.maps.Animation.BOUNCE);
        populateInfoWindow();
        that.hideOtherMarkers(self);
        console.log('clicked...');
    };

    // Changes the look of the marker icon
    function makeMarkerIcon(markerColor, markerCenter) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|' + markerColor + '|' + markerCenter
        );
        return markerImage;
    }

    function populateInfoWindow() {
        if (infowindow.marker === self.marker()) {
            console.log('marker already selected');
        } else {
            infowindow.marker = self.marker();
            infowindow.setContent('retrieving information...');
            map.panTo(self.location());
            var message = {
                'action': 'https://api.yelp.com/v2/business/' + self.yelpId(),
                'method': 'GET',
                'parameters': parameters
            };

            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            $.ajax({
                'url': message.action,
                'data': parameterMap,
                'dataType': 'jsonp',
                'jsonpCallback': 'cb',
                'cache': true
            })
                .fail( function( jqXHR, textStatus, errorThrown) {
                console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');
            })
                .done( function(data, textStatus, jqXHR) {
                    var businessInfo = JSON.parse(JSON.stringify(data));
                    console.log('status[' + textStatus + ']');
                    var contentString = '<div class="yelpInfoWindow">' +
                                        '<div id="yelpBusinessName">' + businessInfo.name + '</div>' +
                                        '<div id="yelpBusinessInfo">' +
                                        '<div class="yelpInfo"><img id="yelpImg" src="' + businessInfo.image_url + '" alt="' + businessInfo.name + '"></div>' +
                                        '<div><img id="yelpRatings" src="' + businessInfo.rating_img_url + '" alt="rating: ' + businessInfo.rating + '"></div>' +
                                        '<div id="yelpPhone"><span class="glyphicon glyphicon-phone-alt"></span> <a href="tel:' + businessInfo.phone + '">' + businessInfo.display_phone + '</a></div>' +
                                        '<span id="yelpBusinessAddress">' + businessInfo.location.display_address + '</span><br>' +
                                        '<span id="yelpSnippet">' + businessInfo.snippet_text + '</span><br>' +
                                        '<span><a href="' + businessInfo.url + '" target="_blank" alt="Yelp Link">See more reviews on Yelp.com</a></span>' +
                                        '</div></div>';
                infowindow.setContent(contentString);
            });
            // console.log(this.marker());
            infowindow.open( map, self.marker() );
            mapCenter = self.marker().position;
            that.hideOtherMarkers(self);
        }

        infowindow.addListener('closeclick', function() {
            map.panTo(mapCenter);
            map.fitBounds(bounds);
            infowindow.marker = null;
            that.showAllMarkers();
        });
    }
};

var infowindowModel = function( info ) {
    // infowindow = new google.maps.InfoWindow();
    return "<p>info</p>";
};

var appViewModel = function() {
    that = this;
    that.mapMarkers = ko.observableArray([]);
    that.searchInfo = ko.observable();
    that.searchCenter = ko.observable();
    that.searchResults = ko.observableArray([]);
    that.viewInfo = ko.observable();

    // Add each hotel to markers array
    mammothLodging.forEach(function(hotel) {
        that.mapMarkers.push(new markerModel(hotel));
    });

    that.infowindow = function() {
        console.log('clicked...', this.yelpId());
    };

    var service = new google.maps.places.PlacesService(map);
    var request = {
        location: mapCenter,
        radius: '500',
        types: ['store']
    };

    that.initiateSearch = function() {
        if (typeof(that.searchInfo()) !== 'undefined' && that.searchInfo() !== '') {
            console.log('Searching for:' , that.searchInfo());
            $("#informationWindow").show(500);
            console.log(mapCenter);
            request.location = mapCenter;
            that.viewInfo = new infowindowModel(that.searchInfo());
            service.nearbySearch(request, callback);
        } else {
            console.log('Please enter text to initiate search...');
        }
    };

    function callback(results, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
            console.log("Search results received...");
            for (var i = 0; i < results.length; i++) {
                that.searchResults.push(new searchResultModel(results[i]));
            }
        } else {
            console.log("search failed...");
        }
    }

    that.closeInfoWindow = function() {
        $("#informationWindow").hide(500);
        that.searchResults([]);
    };

    that.clickFunction = function(clicked) {
        console.log("clicked: ", clicked.location());
        that.searchCenter(clicked.location());
        console.log(that.searchCenter());
        console.log('Activated click function...');
    };

    that.hideOtherMarkers = function(marker) {
        // console.log(marker);
        for (i = 0; i < that.mapMarkers().length; i++) {
            // console.log(that.mapMarkers()[i].marker().map);
            if (marker != that.mapMarkers()[i]) {
                that.mapMarkers()[i].marker().setMap(null);
            }
        }
    };

    that.showAllMarkers = function() {
        for (i = 0; i < that.mapMarkers().length; i++) {
            that.mapMarkers()[i].marker().setMap(map);
        }
    };

    // Resize map to fit all markers
    map.fitBounds(bounds);
    mapCenter = map.getCenter();
    console.log("Map Center: ", mapCenter.lat(), mapCenter.lng());
};

function initMap() {

    // Custom map styling created using https://mapstyle.withgoogle.com/ | minified
    var styles = [{"elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"color":"#eef0f0"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#cccccc"},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"color":"#b9fa99"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#cbfac7"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#66ccff"}]},{"featureType":"road.arterial","stylers":[{"color":"#66ccff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#66ccff"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#000000"},{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#cdfdff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

    // Initialize and create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: mammothLodging[0].location,
        zoom: 20,
        styles: styles
    });

    // Initialize infowindow to display information
    infowindow = new google.maps.InfoWindow();

    bounds = new google.maps.LatLngBounds();

    service = new google.maps.places.PlacesService(map);

    // Apply ViewModel
    ko.applyBindings( new appViewModel() );
}
