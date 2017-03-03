/*
Google Maps Javascript
*/

// List of Mammoth Lakes Locations
var placesInMammoth = [
    { name: 'Cinnamon Bear Inn', phone: '7609342873', listView: true, locationType: 'Lodging', location: { lat: 37.646934, lng: -118.971888 }},
    { name: 'Quality Inn', phone: '7609345114', listView: true, locationType: 'Lodging', location: { lat: 37.648242, lng: -118.975139 }},
    { name: 'Innsbruck Lodge', phone: '7609343035', listView: true, locationType: 'Lodging', location: { lat: 37.651181, lng: -118.982188 }},
    { name: 'Rodeway Inn Wildwood Inn', phone: '7609346855', listView: true, locationType: 'Lodging', location: { lat: 37.649133, lng: -118.976446 }},
    { name: 'M Inn Mammoth', phone: '7609342710', listView: true, locationType: 'Lodging', location: { lat: 37.647426, lng: -118.976800 }},
    { name: 'Shilo Inn Suites', phone: '7609650544', listView: true, locationType: 'Lodging', location: { lat: 37.646093, lng: -118.964614 }},
    { name: 'Travelodge', phone: '8007606483', listView: true, locationType: 'Lodging', location: { lat: 37.649304, lng: -118.974173 }},
    { name: 'Alpenhof Lodge', phone: '7609346330', listView: true, locationType: 'Lodging', location: { lat: 37.650034, lng: -118.983540 }},
    { name: "Giovanni's Pizzeria", phone: '7609347563', listView: true, locationType: 'Restaurant', location: { lat: 37.639957, lng: -118.964398 }},
    { name: "Roberto's Mexican Cafe", phone: '7609343667', listView: true, locationType: 'Restaurant', location: { lat: 37.642279, lng: -118.965988 }},
    { name: 'Starbucks', phone: '7609344536', listView: true, locationType: 'Restaurant', location: { lat: 37.642279, lng: -118.965988 }},
    { name: 'Mammoth Brewing Company', phone: '7609347141', listView: true, locationType: 'Restaurant', location: { lat: 37.648632, lng: -118.983435 }},
    { name: 'Minaret Village Shopping Center', phone: '7609346005', listView: true, locationType: 'Shopping', location: { lat: 37.639138, lng: -118.964294 }},
    { name: 'Vons / Starbucks', phone: '7609344536', listView: true, locationType: 'Shopping', location: { lat: 37.638545, lng: -118.965243 }},
    { name: 'Mammoth Fun Shop', phone: '7609241111', listView: true, locationType: 'Shopping', location: { lat: 37.646967, lng: -118.968285 }},
    { name: "McCoy's Mammoth Memories", phone: '7609247070', listView: true, locationType: 'Shopping', location: { lat: 37.650671, lng: -118.985323 }},
];

// Variables placed in the global scope to ensure it only has one value at all times
var map, bounds, infowindow, infoWindowOptions, mapCenter;

// Initialize markers array
var markers = [];

/*
** This is the model for the markers that are placed on the Google Map and in the dropdown menu.
*/
var markerModel = function(item) {

    var self = this;

    // Variables that define the custom marker look and calls makeMarkerIcon() to create them
    var defaultMarker = makeMarkerIcon('76F5F3', '360CF3');
    var highlightedMarker = makeMarkerIcon('360CF3', '76F5F3');

    self.name = ko.observable(item.name);
    self.phone = ko.observable(item.phone);
    self.locationType = ko.observable(item.locationType);
    self.listView = ko.observable(item.listView);
    // self.yelpId = ko.observable(item.yelpId);
    self.location = ko.observable(item.location);

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
            'https://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|' + markerColor + '|' + markerCenter
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
                // 'action': 'https://api.yelp.com/v2/business/' + self.yelpId(),
                'action': 'https://api.yelp.com/v2/phone_search?phone=+1' + self.phone(),
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
                    console.log(data.businesses[0]);
                    var businessInfo = JSON.parse(JSON.stringify(data.businesses[0]));
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
            infowindow.open( map, self.marker() );
            mapCenter = self.marker().position;
        }

        infowindow.addListener('closeclick', function() {
            map.panTo(mapCenter);
            map.fitBounds(bounds);
            infowindow.marker = null;
        });
    }
};


var appViewModel = function() {
    that = this;
    that.mapMarkers = ko.observableArray([]);
    that.searchInfo = ko.observable();
    that.searchCenter = ko.observable();
    that.searchResults = ko.observableArray([]);
    that.viewInfo = ko.observable();

    that.locationType = ko.observableArray(['All', 'Lodging', 'Restaurant', 'Shopping']);
    that.selectedLocationType = ko.observable('All');

    that.filterMarkers = ko.computed(function() {
        for (var i = 0; i < that.mapMarkers().length; i++) {
            if (that.selectedLocationType() == 'All') {
                that.mapMarkers()[i].marker().setMap(map);
                that.mapMarkers()[i].marker().setAnimation(google.maps.Animation.DROP);
                that.mapMarkers()[i].listView(true);
            } else {
                that.mapMarkers()[i].marker().setMap(null);
                that.mapMarkers()[i].listView(false);
                if (that.selectedLocationType() == that.mapMarkers()[i].locationType()) {
                    that.mapMarkers()[i].marker().setMap(map);
                    that.mapMarkers()[i].marker().setAnimation(google.maps.Animation.DROP);
                    that.mapMarkers()[i].listView(true);
                }
            }
        }
    });

    // Add each hotel to markers array
    placesInMammoth.forEach(function(location) {
        that.mapMarkers.push(new markerModel(location));
    });

    that.toggleMenuWindow = function() {
        $("#menu-window").toggle(500);
        $("#menu-toggle-button").find("span").toggleClass('glyphicon-chevron-up').toggleClass('glyphicon-chevron-down');
    };

    // Resize map to fit all markers
    map.fitBounds(bounds);
    mapCenter = map.getCenter();
};

function initMap() {

    // Custom map styling created using https://mapstyle.withgoogle.com/ | minified
    var styles = [{"elementType":"geometry","stylers":[{"color":"#ffffff"}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"elementType":"labels.text.stroke","stylers":[{"color":"#f5f5f5"}]},{"featureType":"administrative.neighborhood","stylers":[{"visibility":"off"}]},{"featureType":"administrative.province","stylers":[{"visibility":"off"}]},{"featureType":"landscape","stylers":[{"color":"#eef0f0"}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#cccccc"},{"visibility":"simplified"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#757575"}]},{"featureType":"poi.business","stylers":[{"visibility":"off"}]},{"featureType":"poi.business","elementType":"geometry","stylers":[{"color":"#b9fa99"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#cbfac7"}]},{"featureType":"poi.park","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]},{"featureType":"road","elementType":"geometry","stylers":[{"color":"#66ccff"}]},{"featureType":"road.arterial","stylers":[{"color":"#66ccff"}]},{"featureType":"road.arterial","elementType":"labels.text.fill","stylers":[{"color":"#000000"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#66ccff"}]},{"featureType":"road.highway","elementType":"labels.text.fill","stylers":[{"color":"#616161"}]},{"featureType":"road.local","stylers":[{"visibility":"simplified"}]},{"featureType":"road.local","elementType":"labels.text.fill","stylers":[{"color":"#000000"},{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#e5e5e5"}]},{"featureType":"transit.station","elementType":"geometry","stylers":[{"color":"#eeeeee"}]},{"featureType":"water","elementType":"geometry","stylers":[{"color":"#cdfdff"}]},{"featureType":"water","elementType":"labels.text.fill","stylers":[{"color":"#9e9e9e"}]}];

    // Initialize and create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: placesInMammoth[0].location,
        zoom: 20,
        mapTypeControl: false,
        styles: styles
    });

    // Initialize infowindow and bounds
    infowindow = new google.maps.InfoWindow();
    bounds = new google.maps.LatLngBounds();

    // Apply ViewModel
    ko.applyBindings( new appViewModel() );
}
