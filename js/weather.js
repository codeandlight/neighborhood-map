/*
OpenWeatherMap.org
*/

// Toggle Weather Forecast Window
document.getElementById('weatherWindow').addEventListener('click', function() {
  if ($(".weatherInfoWindow").is( ":hidden" )) {
      $(".weatherInfoWindow").slideDown();
    } else {
      $(".weatherInfoWindow").slideUp();
    }
  $(".weatherInfoButton").find("span").toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-up');
});

var owmIconUrl = "http://openweathermap.org/img/w/";
var ownLocationZip = "93546,us";  // Mammoth Lakes, CA
var owmCityId = 5370006;  // Mammmoth Lakes, CA
var owmKey = "363a750eba84b06b38896944ddd563f9";
var owmUrl = "http://api.openweathermap.org/data/2.5/forecast?id=" + owmCityId + "&APPID=" + owmKey;

// Weather Model for KnockoutJS
// This function takes the 5-day forecast result from Open Weather Map API call
// as an argument and creates a ko.observableArray to display the weather
var weatherModel = function() {

    // Calls the Open Weather Maps 5-day Forecast API and sets the response and the time of
    // the call to localStorage.
    function getWeatherForecast() {
        $.getJSON( owmUrl, function(response) {
            console.log('Retrieving OWM weather data...');
            localStorage.owmWeatherForecast = JSON.stringify(response);
            localStorage.owmCallTime = Date.now();
        }).error(function() {
            console.log('Cannot retrieve weather data...');
            return null;
        });
    }

    // Use of the Open Weather Map API is limited therefore, calls to the API are limited to once every
    // three hours
    // If localStorage variables are null; invoke getWeatherForecast()
    if ( ( localStorage.owmCallTime === null ) || ( localStorage.owmWeatherForecast === null )) {
        console.log('Initializing OWM Forecast data...');
        getWeatherForecast();
    } else {
        // If forecast was last updated 3 hours ago (10800000 ms), invoke getWeatherForecast();
        // Otherwise, notify through the console.
        var timeDifference = Date.now() - localStorage.owmCallTime;
        if ( timeDifference > 10800000 ) {
            console.log('Forecast data expired. Updating...');
            getWeatherForecast();
        } else {
            console.log('Forecast data is current...');
            console.log('Last updated: ', new Date(JSON.parse(localStorage.owmCallTime)));
        }
    }


    var weatherData = JSON.parse(localStorage.owmWeatherForecast);
    var weatherArray = ko.observableArray();
    var weatherForecast = weatherData.list;

    // Get forecast information from weather data. 8 weather points are taken per day,
    // therefore, iterate by 8 to get daily forecast value
    for ( var i = 0; i < weatherForecast.length; i += 8 ) {
        var weatherDescription = weatherForecast[i].weather[0].description;
        var weatherIconUrl = '<img src="' + owmIconUrl + weatherForecast[i].weather[0].icon + '.png">';
        var weatherDate = weatherForecast[i].dt_txt.substring(5, 10);

        var weatherValue = {
            date: weatherDate,
            icon: weatherIconUrl,
            desc: weatherDescription
        };
        weatherArray.push(weatherValue);
    }
    return weatherArray;
};

// Weather View Model
var weatherViewModel = function() {
    var self = this;

    self.weatherList = new weatherModel();
};


// Apply knockout bindings
ko.applyBindings(new weatherViewModel());
