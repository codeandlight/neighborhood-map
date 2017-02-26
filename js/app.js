// Menu Toggle
// $("#menu-toggle").click(function(e) {
//     e.preventDefault();
//     $("#wrapper").toggleClass("toggled");
//     $("#wrapper").find("span").toggleClass('glyphicon-menu-right').toggleClass('glyphicon-menu-left');
// });

/*
Google Maps Javascript
*/

// List of locations
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



var markerModel = function(hotel) {

    // Custom marker look
    var defaultMarker = makeMarkerIcon('76F5F3', '360CF3');
    var highlightedMarker = makeMarkerIcon('360CF3', '76F5F3');

    this.name = ko.observable(hotel.name);
    this.yelpId = ko.observable(hotel.yelpId);
    this.location = ko.observable(hotel.location);

    this.marker = ko.observable(new google.maps.Marker({
        position: this.location(),
        title: this.name(),
        map: map,
        icon: defaultMarker,
        animation: google.maps.Animation.DROP
    }));


    // Add marker location to bounds to resize map and fit all markers
    bounds.extend(this.location());

    // Add listeners to marker
    this.marker().addListener('mouseover', function() {
        this.setAnimation(google.maps.Animation.BOUNCE);
        this.setIcon(highlightedMarker);
    });
    this.marker().addListener('mouseout', function() {
        this.setAnimation(-1);
        this.setIcon(defaultMarker);
    });

    this.marker().addListener('click', function() {
        console.log('clicked');
    });

    // Changes the look of the marker icon
    function makeMarkerIcon(markerColor, markerCenter) {
        var markerImage = new google.maps.MarkerImage(
            'http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|' + markerColor + '|' + markerCenter
        );
        return markerImage;
    }

    this.previewOn = function() {
        this.marker().setIcon(highlightedMarker);
        this.marker().setAnimation(google.maps.Animation.BOUNCE);
    };

    this.previewOut = function() {
        this.marker().setIcon(defaultMarker);
        this.marker().setAnimation(-1);
    };

    this.select = function() {
        console.log('clicked...');
    };

};

var appViewModel = function() {
    that = this;
    that.mapMarkers = ko.observableArray([]);

    // Add each hotel to markers array
    mammothLodging.forEach(function(hotel) {
        that.mapMarkers.push(new markerModel(hotel));
    });

    that.clickFunc = function() {
        console.log('clicked...', this.yelpId());
    };

    // Resize map to fit all markers
    map.fitBounds(bounds);
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

    // INitialize infowindow to display information
    var infowindow = new google.maps.InfoWindow();

    bounds = new google.maps.LatLngBounds();

    // Apply ViewModel
    ko.applyBindings( new appViewModel() );
}
