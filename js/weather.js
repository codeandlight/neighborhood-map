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

    var weatherData = JSON.parse(data);
    var weatherForecast = weatherData.daily.data;

    var weatherArray = ko.observableArray();

    for ( var i = 0; i < weatherForecast.length; i++ ) {
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
    // self.weatherData = ko.observable();
    self.weatherList = ko.observableArray();

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
                    console.log('response', typeof(response));
                    localStorage.weatherForecastResponse = JSON.stringify(response);
                    localStorage.weatherUpdateTime = Date.now();
                    self.weatherList = new weatherModel(JSON.stringify(response));
            })
            .error(function (jqXHR, exception) {
                console.log(jqXHR.status, exception);
                self.weatherList = null;
            });
    } else {
            console.log('Forecast data is current...');
            console.log('Last updated: ', new Date(JSON.parse(localStorage.weatherUpdateTime)));
            self.weatherList = new weatherModel(localStorage.weatherForecastResponse);
    }
};


// Apply knockout bindings
ko.applyBindings(new weatherViewModel());
