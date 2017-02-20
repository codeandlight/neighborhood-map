/*
OpenWeatherMap.org
*/

var monthNames = [ 'jan', 'feb', 'mar', 'apr', 'may', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];
var dayNames = [ 'sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' ];

var owmforecast = {"city":{"id":5370006,"name":"Mammoth Lakes","coord":{"lon":-118.972076,"lat":37.648548},"country":"US","population":0,"sys":{"population":0}},"cod":"200","message":0.0063,"cnt":40,"list":[{"dt":1487538000,"main":{"temp":277.34,"temp_min":277.34,"temp_max":277.34,"pressure":767.21,"sea_level":1024.24,"grnd_level":767.21,"humidity":68,"temp_kf":0},"weather":[{"id":801,"main":"Clouds","description":"few clouds","icon":"02d"}],"clouds":{"all":20},"wind":{"speed":1.66,"deg":206.003},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-02-19 21:00:00"},{"dt":1487548800,"main":{"temp":275.99,"temp_min":275.99,"temp_max":275.992,"pressure":768.32,"sea_level":1025.36,"grnd_level":768.32,"humidity":74,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":32},"wind":{"speed":2.32,"deg":214.001},"rain":{"3h":0.07},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-20 00:00:00"},{"dt":1487559600,"main":{"temp":271.72,"temp_min":271.715,"temp_max":271.72,"pressure":769.57,"sea_level":1027.26,"grnd_level":769.57,"humidity":80,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":36},"wind":{"speed":2.23,"deg":202.001},"rain":{"3h":0.1},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-20 03:00:00"},{"dt":1487570400,"main":{"temp":270.63,"temp_min":270.63,"temp_max":270.634,"pressure":771.46,"sea_level":1029.51,"grnd_level":771.46,"humidity":78,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":20},"wind":{"speed":2.26,"deg":210.006},"rain":{"3h":0.035},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-20 06:00:00"},{"dt":1487581200,"main":{"temp":271.547,"temp_min":271.547,"temp_max":271.547,"pressure":771.64,"sea_level":1029.9,"grnd_level":771.64,"humidity":88,"temp_kf":0},"weather":[{"id":803,"main":"Clouds","description":"broken clouds","icon":"04n"}],"clouds":{"all":68},"wind":{"speed":1.74,"deg":202.001},"rain":{},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-20 09:00:00"},{"dt":1487592000,"main":{"temp":272.797,"temp_min":272.797,"temp_max":272.797,"pressure":771.11,"sea_level":1029.71,"grnd_level":771.11,"humidity":89,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":64},"wind":{"speed":2.37,"deg":191},"rain":{"3h":0.285},"snow":{"3h":0.093},"sys":{"pod":"n"},"dt_txt":"2017-02-20 12:00:00"},{"dt":1487602800,"main":{"temp":273.282,"temp_min":273.282,"temp_max":273.282,"pressure":772.55,"sea_level":1031.32,"grnd_level":772.55,"humidity":90,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":56},"wind":{"speed":2.56,"deg":199.003},"rain":{"3h":0.945},"snow":{"3h":0.509},"sys":{"pod":"d"},"dt_txt":"2017-02-20 15:00:00"},{"dt":1487613600,"main":{"temp":275.997,"temp_min":275.997,"temp_max":275.997,"pressure":773.95,"sea_level":1031.68,"grnd_level":773.95,"humidity":82,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":44},"wind":{"speed":3.65,"deg":204.501},"rain":{"3h":0.68},"snow":{"3h":0.197},"sys":{"pod":"d"},"dt_txt":"2017-02-20 18:00:00"},{"dt":1487624400,"main":{"temp":276.507,"temp_min":276.507,"temp_max":276.507,"pressure":774.42,"sea_level":1030.76,"grnd_level":774.42,"humidity":81,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":64},"wind":{"speed":4.21,"deg":207.011},"rain":{"3h":1.365},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-02-20 21:00:00"},{"dt":1487635200,"main":{"temp":275.678,"temp_min":275.678,"temp_max":275.678,"pressure":775.02,"sea_level":1030.95,"grnd_level":775.02,"humidity":81,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":4.81,"deg":210.5},"rain":{"3h":0.72},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-21 00:00:00"},{"dt":1487646000,"main":{"temp":274.349,"temp_min":274.349,"temp_max":274.349,"pressure":775.33,"sea_level":1032.59,"grnd_level":775.33,"humidity":82,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":36},"wind":{"speed":4.46,"deg":205.006},"rain":{"3h":0.79},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-21 03:00:00"},{"dt":1487656800,"main":{"temp":273.553,"temp_min":273.553,"temp_max":273.553,"pressure":776.05,"sea_level":1034.17,"grnd_level":776.05,"humidity":91,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":80},"wind":{"speed":3.47,"deg":209.006},"rain":{"3h":0.64},"snow":{"3h":0.8825},"sys":{"pod":"n"},"dt_txt":"2017-02-21 06:00:00"},{"dt":1487667600,"main":{"temp":273.352,"temp_min":273.352,"temp_max":273.352,"pressure":775.94,"sea_level":1034.58,"grnd_level":775.94,"humidity":88,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":3.76,"deg":202.502},"rain":{"3h":0.47},"snow":{"3h":1.3375},"sys":{"pod":"n"},"dt_txt":"2017-02-21 09:00:00"},{"dt":1487678400,"main":{"temp":274.345,"temp_min":274.345,"temp_max":274.345,"pressure":773.65,"sea_level":1032.45,"grnd_level":773.65,"humidity":80,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":4.72,"deg":195},"rain":{"3h":0.14},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-21 12:00:00"},{"dt":1487689200,"main":{"temp":274.04,"temp_min":274.04,"temp_max":274.04,"pressure":774.39,"sea_level":1033.61,"grnd_level":774.39,"humidity":91,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":3.31,"deg":207.503},"rain":{"3h":0.94},"snow":{"3h":0.39},"sys":{"pod":"d"},"dt_txt":"2017-02-21 15:00:00"},{"dt":1487700000,"main":{"temp":275.271,"temp_min":275.271,"temp_max":275.271,"pressure":775.38,"sea_level":1033.64,"grnd_level":775.38,"humidity":89,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":92},"wind":{"speed":2.72,"deg":206.001},"rain":{"3h":0.91},"snow":{"3h":0.2775},"sys":{"pod":"d"},"dt_txt":"2017-02-21 18:00:00"},{"dt":1487710800,"main":{"temp":275.789,"temp_min":275.789,"temp_max":275.789,"pressure":774.8,"sea_level":1031.6,"grnd_level":774.8,"humidity":80,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10d"}],"clouds":{"all":24},"wind":{"speed":4.75,"deg":210.503},"rain":{"3h":0.54},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-02-21 21:00:00"},{"dt":1487721600,"main":{"temp":275.119,"temp_min":275.119,"temp_max":275.119,"pressure":773.76,"sea_level":1029.85,"grnd_level":773.76,"humidity":75,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":12},"wind":{"speed":5.57,"deg":212},"rain":{"3h":0.24},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-22 00:00:00"},{"dt":1487732400,"main":{"temp":274.658,"temp_min":274.658,"temp_max":274.658,"pressure":772.34,"sea_level":1029.2,"grnd_level":772.34,"humidity":80,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":68},"wind":{"speed":4.42,"deg":217.5},"rain":{"3h":0.6},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-22 03:00:00"},{"dt":1487743200,"main":{"temp":273.747,"temp_min":273.747,"temp_max":273.747,"pressure":772.04,"sea_level":1029.98,"grnd_level":772.04,"humidity":75,"temp_kf":0},"weather":[{"id":500,"main":"Rain","description":"light rain","icon":"10n"}],"clouds":{"all":20},"wind":{"speed":5.82,"deg":216.502},"rain":{"3h":0.1},"snow":{"3h":0.0025},"sys":{"pod":"n"},"dt_txt":"2017-02-22 06:00:00"},{"dt":1487754000,"main":{"temp":271.275,"temp_min":271.275,"temp_max":271.275,"pressure":771.38,"sea_level":1030.13,"grnd_level":771.38,"humidity":72,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":4.82,"deg":214.501},"rain":{},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-22 09:00:00"},{"dt":1487764800,"main":{"temp":271.062,"temp_min":271.062,"temp_max":271.062,"pressure":769.48,"sea_level":1028.48,"grnd_level":769.48,"humidity":73,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02n"}],"clouds":{"all":8},"wind":{"speed":4.56,"deg":209.002},"rain":{},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-22 12:00:00"},{"dt":1487775600,"main":{"temp":269.519,"temp_min":269.519,"temp_max":269.519,"pressure":768.6,"sea_level":1028.13,"grnd_level":768.6,"humidity":68,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":3.86,"deg":215.503},"rain":{},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-02-22 15:00:00"},{"dt":1487786400,"main":{"temp":271.667,"temp_min":271.667,"temp_max":271.667,"pressure":767.7,"sea_level":1026.32,"grnd_level":767.7,"humidity":74,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"02d"}],"clouds":{"all":8},"wind":{"speed":4,"deg":218.51},"rain":{},"snow":{},"sys":{"pod":"d"},"dt_txt":"2017-02-22 18:00:00"},{"dt":1487797200,"main":{"temp":271.794,"temp_min":271.794,"temp_max":271.794,"pressure":765.7,"sea_level":1023.98,"grnd_level":765.7,"humidity":73,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":64},"wind":{"speed":3.37,"deg":225.002},"rain":{},"snow":{"3h":0.1175},"sys":{"pod":"d"},"dt_txt":"2017-02-22 21:00:00"},{"dt":1487808000,"main":{"temp":269.613,"temp_min":269.613,"temp_max":269.613,"pressure":765.4,"sea_level":1024.4,"grnd_level":765.4,"humidity":75,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":80},"wind":{"speed":1.96,"deg":258.5},"rain":{},"snow":{"3h":0.825},"sys":{"pod":"n"},"dt_txt":"2017-02-23 00:00:00"},{"dt":1487818800,"main":{"temp":264.26,"temp_min":264.26,"temp_max":264.26,"pressure":765.32,"sea_level":1026.29,"grnd_level":765.32,"humidity":78,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":12},"wind":{"speed":1.42,"deg":226.503},"rain":{},"snow":{"3h":0.05},"sys":{"pod":"n"},"dt_txt":"2017-02-23 03:00:00"},{"dt":1487829600,"main":{"temp":261.724,"temp_min":261.724,"temp_max":261.724,"pressure":764.97,"sea_level":1027.27,"grnd_level":764.97,"humidity":81,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":44},"wind":{"speed":1.63,"deg":217.004},"rain":{},"snow":{"3h":0.065},"sys":{"pod":"n"},"dt_txt":"2017-02-23 06:00:00"},{"dt":1487840400,"main":{"temp":262.496,"temp_min":262.496,"temp_max":262.496,"pressure":765.05,"sea_level":1028.85,"grnd_level":765.05,"humidity":86,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13n"}],"clouds":{"all":8},"wind":{"speed":1.96,"deg":233.001},"rain":{},"snow":{"3h":0.08},"sys":{"pod":"n"},"dt_txt":"2017-02-23 09:00:00"},{"dt":1487851200,"main":{"temp":259.468,"temp_min":259.468,"temp_max":259.468,"pressure":765.49,"sea_level":1030.57,"grnd_level":765.49,"humidity":86,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":2.05,"deg":218.501},"rain":{},"snow":{"3h":0.0025},"sys":{"pod":"n"},"dt_txt":"2017-02-23 12:00:00"},{"dt":1487862000,"main":{"temp":259.048,"temp_min":259.048,"temp_max":259.048,"pressure":767.35,"sea_level":1033.75,"grnd_level":767.35,"humidity":90,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":64},"wind":{"speed":0.61,"deg":265.002},"rain":{},"snow":{"3h":0.3925},"sys":{"pod":"d"},"dt_txt":"2017-02-23 15:00:00"},{"dt":1487872800,"main":{"temp":265.165,"temp_min":265.165,"temp_max":265.165,"pressure":769.07,"sea_level":1034.29,"grnd_level":769.07,"humidity":77,"temp_kf":0},"weather":[{"id":600,"main":"Snow","description":"light snow","icon":"13d"}],"clouds":{"all":32},"wind":{"speed":1.51,"deg":11.0025},"rain":{},"snow":{"3h":0.225},"sys":{"pod":"d"},"dt_txt":"2017-02-23 18:00:00"},{"dt":1487883600,"main":{"temp":267.182,"temp_min":267.182,"temp_max":267.182,"pressure":768.97,"sea_level":1032.27,"grnd_level":768.97,"humidity":75,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":36},"wind":{"speed":1.31,"deg":322.502},"rain":{},"snow":{"3h":0.005},"sys":{"pod":"d"},"dt_txt":"2017-02-23 21:00:00"},{"dt":1487894400,"main":{"temp":268.055,"temp_min":268.055,"temp_max":268.055,"pressure":768.57,"sea_level":1031.77,"grnd_level":768.57,"humidity":68,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":1.11,"deg":317.501},"rain":{},"snow":{"3h":0.0025},"sys":{"pod":"n"},"dt_txt":"2017-02-24 00:00:00"},{"dt":1487905200,"main":{"temp":260.589,"temp_min":260.589,"temp_max":260.589,"pressure":769.52,"sea_level":1034.42,"grnd_level":769.52,"humidity":79,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":1.01,"deg":20},"rain":{},"snow":{},"sys":{"pod":"n"},"dt_txt":"2017-02-24 03:00:00"},{"dt":1487916000,"main":{"temp":256.16,"temp_min":256.16,"temp_max":256.16,"pressure":770.76,"sea_level":1037.06,"grnd_level":770.76,"humidity":91,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":24},"wind":{"speed":1.07,"deg":38.5001},"rain":{},"snow":{"3h":0.005},"sys":{"pod":"n"},"dt_txt":"2017-02-24 06:00:00"},{"dt":1487926800,"main":{"temp":255.384,"temp_min":255.384,"temp_max":255.384,"pressure":770.6,"sea_level":1037.84,"grnd_level":770.6,"humidity":98,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":12},"wind":{"speed":0.76,"deg":300.501},"rain":{},"snow":{"3h":0.0275},"sys":{"pod":"n"},"dt_txt":"2017-02-24 09:00:00"},{"dt":1487937600,"main":{"temp":253.403,"temp_min":253.403,"temp_max":253.403,"pressure":770.04,"sea_level":1038.14,"grnd_level":770.04,"humidity":87,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01n"}],"clouds":{"all":0},"wind":{"speed":1.07,"deg":226.503},"rain":{},"snow":{"3h":0.0025},"sys":{"pod":"n"},"dt_txt":"2017-02-24 12:00:00"},{"dt":1487948400,"main":{"temp":252.62,"temp_min":252.62,"temp_max":252.62,"pressure":770.69,"sea_level":1039.27,"grnd_level":770.69,"humidity":72,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":1.12,"deg":236.001},"rain":{},"snow":{"3h":0.005},"sys":{"pod":"d"},"dt_txt":"2017-02-24 15:00:00"},{"dt":1487959200,"main":{"temp":264.854,"temp_min":264.854,"temp_max":264.854,"pressure":771.35,"sea_level":1037.42,"grnd_level":771.35,"humidity":68,"temp_kf":0},"weather":[{"id":800,"main":"Clear","description":"clear sky","icon":"01d"}],"clouds":{"all":0},"wind":{"speed":0.41,"deg":310.504},"rain":{},"snow":{"3h":0.0025},"sys":{"pod":"d"},"dt_txt":"2017-02-24 18:00:00"}]};
var owmIconUrl = "http://openweathermap.org/img/w/";
var ownLocationZip = "93546,us";  // Mammoth Lakes, CA
var owmCityId = 5370006;  // Mammmoth Lakes, CA
var owmKey = "363a750eba84b06b38896944ddd563f9";
var owmUrl = "http://api.openweathermap.org/data/2.5/forecast?id=" + owmCityId + "&APPID=" + owmKey;
// $.getJSON( weatherUrl, function(response) {
//   console.log(weatherUrl);
//   var forecast = response;
//   console.log(forecast);
// }).error(function() {
//   console.log('error in getting weather');
// });

// This function takes in the result from the API call to openweather.org
// and grabs the necessary information to report the weather forecast
// Information here is a knockout observable
// function reportWeather(forecast) {

//     var weatherArray = ko.observableArray();
//     var wResult = forecast.list;
//     // Eight (8) readings are forecasted per day, therefore iterate by 8 to get daily report
//     for ( var i = 0; i < wResult.length; i += 8 ) {

//         var weatherDescription = wResult[i].weather[0].description;
//         var weatherIconUrl = owmIconUrl + wResult[i].weather[0].icon;
//         var weatherDate = wResult[i].dt_txt.substring(5, 10);

//         var owmDescription = '<span id="weatherDescription" class="weatherTable">' + wResult[i].weather[0].description + '</span>';
//         var owmIconUrl = '<span id="weatherIcon" class="weatherTable"><img src="http://openweathermap.org/img/w/' + wResult[i].weather[0].icon + '.png"></span>';
//         var owmTime = '<span id="weatherTime" class="weatherTable">' + wResult[i].dt_txt.substring(5, 10) + '</span>';
//         var owmReport = '<tr><td>' + owmTime + '</td><td>' + owmIconUrl + '</td><td>' + owmDescription + '</td></tr>';
//         // $(owmReport).appendTo('#weatherInfo');

//         var weatherValue = { date: weatherDate, icon: weatherIconUrl, desc: weatherDescription };
//         weatherArray.push(weatherValue);
//     }

//     console.log(weatherArray());
// }

// reportWeather(owmforecast);

// Weather Model for KnockoutJS
var weatherModel = function(weatherData) {

    // weatherData is a 5-day forecast received from Open Weather Maps API call
    var weatherForecast = weatherData.list;
    var weatherArray = ko.observableArray();

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

var weatherViewModel = function() {
    var self = this;

    self.weatherList = new weatherModel(owmforecast);

};

// weatherModel will be called by JSON API call to Open Weather Map
// returned information will be passed on to weatherModel.
// weatherModel(owmforecast);

// Apply knockout bindings
ko.applyBindings(new weatherViewModel());


// Toggle Weather Forecast Window
document.getElementById('weatherWindow').addEventListener('click', function() {
  if ($(".weatherInfoWindow").is( ":hidden" )) {
      $(".weatherInfoWindow").slideDown();
    } else {
      $(".weatherInfoWindow").slideUp();
    }
  $(".weatherInfoButton").find("span").toggleClass('glyphicon-menu-down').toggleClass('glyphicon-menu-up');
});
