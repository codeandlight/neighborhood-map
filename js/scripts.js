// List of locations
var skiResorts = [
    { name: "Heavenly Mountain Resort", location: {lat: 38.957265, lng: -119.942719 }},
    { name: "Northstar California Resort", location: { lat: 39.290828, lng: -120.119423 }},
    { name: "Squaw Valley Resort", location: { lat: 39.234946, lng: -120.238452 }},
    { name: "Sierra-At-Tahoe Resort", location: { lat: 38.825300, lng: -120.079150 }},
    { name: "Homewood Mountain Resort", location: { lat: 39.115711, lng: -120.160174 }},
    { name: "Alpine Meadows Ski Resort", location: { lat: 39.196643, lng: -120.238452 }},
    { name: "Diamond Peak Ski Resort", location: { lat: 39.254090, lng: -119.912982 }},
    { name: "Mt. Rose Ski Tahoe", location: { lat: 39.356102, lng: -119.882770 }},
    { name: "Donner Ski Ranch", location: { lat: 39.346938, lng: -120.329092 }},
    { name: "Sugar Bowl Resort", location: { lat: 39.327820, lng: -120.331838 }}
];

// Initialize map variable
var map;

// Initialize markers array
var markers = [];


function initMap() {

    var styles = [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f5f5"
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
        "featureType": "administrative.land_parcel",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#bdbdbd"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "stylers": [
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#ffffff"
          },
          {
            "visibility": "on"
          }
        ]
      },
      {
        "featureType": "landscape.natural.landcover",
        "stylers": [
          {
            "color": "#800080"
          }
        ]
      },
      {
        "featureType": "landscape.natural.terrain",
        "stylers": [
          {
            "color": "#ffffff"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#eeeeee"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text",
        "stylers": [
          {
            "visibility": "off"
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
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e5e5e5"
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
            "color": "#ffffff"
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
            "color": "#66ccff"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels",
        "stylers": [
          {
            "visibility": "off"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#9e9e9e"
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
            "color": "#c9c9c9"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#66ffff"
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
    ]

    // Initialize and create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: skiResorts[0].location,
        zoom: 25,
        mapTypeControlOptions: {
            mapTypeIds: [ 'roadmap' ]
        },
        styles: styles
    });

    // Create a new bounds object to adjust the boundaries of the map
  	var bounds = new google.maps.LatLngBounds();

	for ( var i = 0; i < skiResorts.length; i++ ) {
		var position = skiResorts[i].location;
		var title = skiResorts[i].name;

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
	}

    // Fit the map boundaries to all marker positions
    map.fitBounds(bounds);
}

// Change background opacity during mouseover/mouseout
document.getElementById('options-box').addEventListener('mouseover', function() {
    // style: rgba(204, 204, 204, 0.5);
    var elem = document.getElementById('options-box');
    elem.style.backgroundColor = "rgba(204, 204, 204, 0.3)";
});

document.getElementById('options-box').addEventListener('mouseout', function() {
    var elem = document.getElementById('options-box');
    elem.style.backgroundColor = "rgba(204, 204, 204, 0.9)";
});
