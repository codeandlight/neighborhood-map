/*
Google Maps Javascript
*/

// List of locations
var mammothLodging = [
    { name: "Cinnabon Bear Inn", location: { lat: 37.646934, lng: -118.971888 }},
    { name: "Quality Inn", location: { lat: 37.648242, lng: -118.975139 }},
    { name: "Innsbruck Lodge", location: { lat: 37.651181, lng: -118.982188 }},
    { name: "Best Western Plus High Sierra Hotel", location: { lat: 37.648938, lng: -118.969333 }},
    { name: "Rodeway Inn Wildwood Inn", location: { lat: 37.649133, lng: -118.976446 }},
    { name: "M Inn Mammoth", location: { lat: 37.647426, lng: -118.976800 }},
    { name: "Shilo Inn Suites", location: { lat: 37.646093, lng: -118.964614 }},
    { name: "Travelodge", location: { lat: 37.649304, lng: -118.974173 }},
    { name: "Alpenhof Lodge", location: { lat: 37.650034, lng: -118.983540 }}
];

// Initialize map variable
var map;

// Initialize markers array
var markers = [];

function initMap() {

    // Custom map styling using: https://mapstyle.withgoogle.com/
    var styles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "elementType": "labels.icon",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f5f5"
          }
        ]
      },
      {
        "featureType": "administrative.neighborhood",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.province",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "landscape",
        "stylers": [
          {
            "color": "#eef0f0"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#cccccc"
          },
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#757575"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "poi.business",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#b9fa99"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#cbfac7"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#66ccff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "stylers": [
          {
            "color": "#66ccff"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#000000"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#66ccff"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#616161"
          }
        ]
      },
      {
        "featureType": "road.local",
        "stylers": [
          {
            "visibility": "simplified"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#000000"
          },
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#cdfdff"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
          }
        ]
      }
    ];

    // Initialize infowindow to display information
    var infowindow = new google.maps.InfoWindow();

    // Initialize and create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: mammothLodging[0].location,
        zoom: 25,
        mapTypeControl: false,
        mapTypeControlOptions: {
            mapTypeIds: [ 'roadmap' ]
        },
        styles: styles
    });

    // Create a new bounds object to adjust the boundaries of the map
  	var bounds = new google.maps.LatLngBounds();
	for ( var i = 0; i < mammothLodging.length; i++ ) {
		var position = mammothLodging[i].location;
		var title = mammothLodging[i].name;

        var marker = new google.maps.Marker({
			position: position,
			title: title,
			map: map,
			animation: google.maps.Animation.DROP,
			id: i
		});

        // Push new marker into markers array
        markers.push(marker);

        // Add marker.position to bounds
        bounds.extend(marker.position);

        // Add click event to populate infowindow when marker is clicked
        marker.addListener('click', function() {
            populateInfoWindow(this, infowindow);
        });
	}

    // Fit the map boundaries to all marker positions
    map.fitBounds(bounds);

    // Populate Infowindow
    function populateInfoWindow( marker, infowindow ) {
        if ( infowindow.marker != marker ) {
            infowindow.marker = marker;
            infowindow.setContent('<div><h2>' + marker.title + '</h2></div>');
            infowindow.open( map, marker );
        }

        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });
    }
}

// Menu Toggle
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("toggled");
    $("#wrapper").find("span").toggleClass('glyphicon-menu-right').toggleClass('glyphicon-menu-left');
});


