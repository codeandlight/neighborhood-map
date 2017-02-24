/*
OpenWeatherMap.org
*/

// Toggle Weather Forecast Window
// document.getElementById('weatherWindow').addEventListener('click', function() {
//   if ($(".weatherInfoWindow").is( ":hidden" )) {
//       $(".weatherInfoWindow").slideDown();
//     } else {
//       $(".weatherInfoWindow").slideUp();
//     }
//   $(".weatherInfoButton").find("span").toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-up');
// });

// // Variables for for Open Weather Map
// var owmIconUrl = "http://openweathermap.org/img/w/";
// var ownLocationZip = "93546,us";  // Mammoth Lakes, CA
// var owmCityId = 5370006;  // Mammmoth Lakes, CA
// var owmKey = "363a750eba84b06b38896944ddd563f9";
// var owmUrl = "http://api.openweathermap.org/data/2.5/forecast?id=" + owmCityId + "&APPID=" + owmKey;

// Variables for Dark Sky
var darkSkyUrl = "https://api.darksky.net/forecast/";
var darkSkyKey = "19d44a25d3797ee6bb826a9c306e6d4c"
var darkSkyLoc = { lat: 37.649123, lng: -118.977546 }
var weatherApiUrl = darkSkyUrl + darkSkyKey + '/' + darkSkyLoc.lat + ',' + darkSkyLoc.lng;


var weatherForecast;
// Weather Model for KnockoutJS
// This function takes the 5-day forecast result from Open Weather Map API call
// as an argument and creates a ko.observableArray to display the weather
var weatherModel = function() {

    var weatherData = ko.observable();
    var weatherArray = ko.observableArray();

    /*
    ** Calls the Open Weather Maps 5-day Forecast API and sets the response and the time of
    ** the call to localStorage.
    ** Use of the Open Weather Map API is limited therefore, calls to the API are limited to once every three hours
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
                    console.log(response);
                    localStorage.weatherForecastResponse = JSON.stringify(response);
                    localStorage.weatherUpdateTime = Date.now();
                    weatherData = JSON.parse(localStorage.weatherForecastResponse);
            })
            .error(function (jqXHR, exception) {
                console.log(jqXHR.status, exception);
                return null;
            });
    } else {
            console.log('Forecast data is current...');
            console.log('Last updated: ', new Date(JSON.parse(localStorage.weatherUpdateTime)));
            weatherData = JSON.parse(localStorage.weatherForecastResponse);
    }

    // var weatherForecast = weatherData.list;
    weatherForecast = weatherData.daily.data;

    // Get forecast information from weather data. 8 weather points are taken per day,
    // therefore, iterate by 8 to get daily forecast value
    for ( var i = 0; i < weatherForecast.length; i++ ) {
        // var weatherDescription = weatherForecast[i].weather[0].description;
        // var weatherIconUrl = '<img src="' + owmIconUrl + weatherForecast[i].weather[0].icon + '.png">';
        // var weatherDate = weatherForecast[i].dt_txt.substring(5, 10);
        var weatherDescription = weatherForecast[i].summary;
        var weatherIconUrl = '<i class="wi wi-forecast-io-' + weatherForecast[i].icon + '"></i>';
        var weatherDate = new Date(weatherForecast[i].time*1000).toISOString().substring(5, 10); //.substring(0, 10);

        var weatherValue = {
            date: weatherDate,
            icon: weatherIconUrl,
            desc: weatherDescription
        };

        weatherArray.push(weatherValue);
    }

    return weatherArray();
};

// Weather View Model
var weatherViewModel = function() {
    var self = this;
    var weatherList = ko.observableArray();

    self.weatherList = new weatherModel();
};


// Apply knockout bindings
ko.applyBindings(new weatherViewModel());
