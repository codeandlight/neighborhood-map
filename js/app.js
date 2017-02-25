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
    { name: "Cinnamon Bear Inn", yelpId: "cinnamon-bear-inn-mammoth-lakes", location: { lat: 37.646934, lng: -118.971888 }},
    { name: "Quality Inn", yelpId: "quality-inn-near-mammoth-mountain-ski-resort-mammoth-lakes", location: { lat: 37.648242, lng: -118.975139 }},
    { name: "Innsbruck Lodge", yelpId: "innsbruck-lodge-mammoth-lakes", location: { lat: 37.651181, lng: -118.982188 }},
    { name: "Best Western Plus High Sierra Hotel", yelpId: "best-western-plus-high-sierra-hotel-mammoth-lakes-3", location: { lat: 37.648938, lng: -118.969333 }},
    { name: "Rodeway Inn Wildwood Inn", yelpId: "rodeway-inn-wildwood-inn-mammoth-lakes", location: { lat: 37.649133, lng: -118.976446 }},
    { name: "M Inn Mammoth", yelpId: "the-m-inn-mammoth-mammoth-lakes", location: { lat: 37.647426, lng: -118.976800 }},
    { name: "Shilo Inn Suites", yelpId: "shilo-inn-suites-hotel-mammoth-lakes-mammoth-lakes", location: { lat: 37.646093, lng: -118.964614 }},
    { name: "Travelodge", yelpId: "travelodge-mammoth-lakes-mammoth-lakes", location: { lat: 37.649304, lng: -118.974173 }},
    { name: "Alpenhof Lodge", yelpId: "alpenhof-lodge-mammoth-lakes", location: { lat: 37.650034, lng: -118.983540 }}
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

    // Custom marker looks
    var defaultMarker = makeMarkerIcon('76F5F3', '360CF3');
    var highlightedMarker = makeMarkerIcon('360CF3', '76F5F3');

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
      icon: defaultMarker,
            animation: google.maps.Animation.DROP,
            id: i
        });

        // Push new marker into markers array
        markers.push(marker);

        // Add marker.position to bounds
        bounds.extend(marker.position);

        // Add listeners to change the look of icons
        marker.addListener('mouseover', function() {
          this.setIcon(highlightedMarker);
        });
        marker.addListener('mouseout', function() {
          this.setIcon(defaultMarker);
        });

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
            infowindow.setContent(null);

            var message = {
                'action': 'https://api.yelp.com/v2/business/' + mammothLodging[marker.id].yelpId,
                'method' : 'GET',
                'parameters' : parameters
            };


            OAuth.setTimestampAndNonce(message);
            OAuth.SignatureMethod.sign(message, accessor);
            var parameterMap = OAuth.getParameterMap(message.parameters);
            $.ajax({
                'url' : message.action,
                'data' : parameterMap,
                'dataType' : 'jsonp',
                'jsonpCallback' : 'cb',
                'cache' : true
            })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log('error[' + errorThrown + '], status[' + textStatus + '], jqXHR[' + JSON.stringify(jqXHR) + ']');

            })
                .done(function(data, textStatus, jqXHR) {
                    var businessInfo = JSON.parse(JSON.stringify(data));
                    console.log('status['+ textStatus + ']');
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

                // infowindow.setContent('<div><h2>' + marker.title + '</h2><p>' + mammothLodging[marker.id].yelpId + '</p></div>');
                infowindow.open( map, marker );
            });
        }

        infowindow.addListener('closeclick', function() {
            infowindow.marker = null;
        });


    }

    // Create custom marker icons
    function makeMarkerIcon(markerColor, markerCenter) {
      var markerImage = new google.maps.MarkerImage(
        'http://chart.apis.google.com/chart?chst=d_map_pin_letter_withshadow&chld=%E2%80%A2|' + markerColor + '|' + markerCenter
        );
      return markerImage;
    }
}

/*
Dark Sky
*/

// Variables for Dark Sky
var darkSkyUrl = "https://api.darksky.net/forecast/";
var darkSkyKey = "19d44a25d3797ee6bb826a9c306e6d4c";
var darkSkyLoc = { lat: 37.649123, lng: -118.977546 };
var weatherApiUrl = darkSkyUrl + darkSkyKey + '/' + darkSkyLoc.lat + ',' + darkSkyLoc.lng;

// Weather Model for KnockoutJS
// This function takes the 5-day forecast result from Open Weather Map API call
// as an argument and creates a ko.observableArray to display the weather
var weatherModel = function(data) {

    // var weatherData = JSON.parse(data);
    // var weatherForecast = weatherData.daily.data;

    var weatherForecast = data;
    // this.weatherArray = ko.observableArray();

    this.date = ko.observable();
    this.icon = ko.observable();
    this.description = ko.observable();

    // console.log(weatherForecast);
    // console.log(weatherForecast.icon);
    this.date = ko.observable(new Date(weatherForecast.time*1000).toISOString().substring(5, 10));
    // var icon = ko.observable('<i class="wi wi-forecast-io-' + weatherForecast.icon + '"></i>');
    var iconString = "wi wi-forecast-io-" + weatherForecast.icon;
    this.icon = ko.observable(iconString);
    this.description = ko.observable(weatherForecast.summary);

    console.log(this.icon());

    // for ( var i = 0; i < weatherForecast.length; i++ ) {
    //     var weatherDescription = weatherForecast.summary;
    //     var weatherIconUrl = '<i class="wi wi-forecast-io-' + weatherForecast.icon + '"></i>';
    //     var weatherDate = new Date(weatherForecast.time*1000).toISOString().substring(5, 10); //.substring(0, 10);

    //     var date = ko.observable(weatherDate);
    //     var icon = ko.observable(weatherIconUrl);
    //     var desc = ko.observable(weatherDescription);

    //     var weatherValue = {
    //         date: weatherDate,
    //         icon: weatherIconUrl,
    //         desc: weatherDescription
    //     };

    //     weatherArray.push(weatherValue);
    // }

    // return weatherArray();
};



// Weather View Model
var appViewModel = function() {
    var self = this;

    var tempWeatherObject;
    // self.weatherData = ko.observable();
    self.weatherList = ko.observableArray();

    var dailyForecast;

    /*
    ** Calls the Dark Sky Weather Forecast API and sets the response and the time of
    ** the call to localStorage.
    ** To reduce calls to the API, localStorage is used to limit the API use
    ** If localStorage variables are null or if last update is longer than 3 hours (10800000 ms);
    ** the API is called and localStorage var are updated.
    */
    if (( typeof(localStorage.weatherUpdateTime) === 'undefined') ||
        ( typeof(localStorage.weatherForecastResponse)  === 'undefined' ) ||
        (Date.now() - localStorage.weatherUpdateTime) > 10800000 ) {
            console.log('Requesting API...');
            $.ajax({
                url: weatherApiUrl,
                dataType: "jsonp",

            })
            .done(function(response) {
                    // console.log('response: ', typeof(response), response);
                    tempWeatherObject = JSON.parse(JSON.stringify(response)); // Take response, stringify, parse, then store temporarily
                    localStorage.weatherForecastResponse = JSON.stringify(response); // Save in localStorage for later
                    localStorage.weatherUpdateTime = Date.now();
                    // self.weatherList = new weatherModel(JSON.stringify(response));
                    console.log(tempWeatherObject.daily);
                    dailyForecast = tempWeatherObject.daily;  // Assign list of daily weather forecast
            })
            .error(function (jqXHR, exception) {
                console.log(jqXHR.status, exception);
                self.weatherList = null;
            });
    } else {
            console.log('Forecast data is current...');
            console.log('Last updated: ', new Date(JSON.parse(localStorage.weatherUpdateTime)));
            // self.weatherList = new weatherModel(localStorage.weatherForecastResponse);
            tempWeatherObject = JSON.parse(localStorage.weatherForecastResponse);
            // console.log(tempWeatherObject.daily);
            dailyForecast = tempWeatherObject.daily;
    }

    // console.log(self.dailyForecast.data.length);



    dailyForecast.data.forEach(function(forecast) {
      self.weatherList.push( new weatherModel(forecast) );
    });

    console.log(self.weatherList()[0].date());
    console.log(self.weatherList()[0].icon());
    console.log(self.weatherList()[0].description());
};


// // Display Model for KnockoutJS
// function appModel(lodge) {
//     this.lodgeName = ko.observable(lodge.name);

// }

// function appViewModel() {
//     self = this;

//     self.lodgingInfoList = ko.observableArray();

//     mammothLodging.forEach(function(lodge) {
//         self.lodgingInfoList.push( new appModel(lodge) );
//     });
// }

// var masterVM = {
//     vmA: new weatherViewModel(),
//     vmB: new appViewModel()
// };

ko.applyBindings( new appViewModel() );
