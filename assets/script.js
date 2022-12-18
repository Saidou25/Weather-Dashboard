

var currentDay = dayjs().format(" (M/D/YYYY)");
var apiKey = "4f112ad8f388d7d13afdcbf2472fed94";

$(function () {

  $(".btn").on("click", function (event) {
    $("cityNameInput").empty();
    event.preventDefault();
    var cityName = $("#cityNameInput").val();
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;

    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        $()
        for (var i = 0; i < data.length; i++) {
          var cityReturn = (data[i].name)
          var latitude = (data[i].lat);
          var longitude = (data[i].lon);
        }
        var todayWeathetUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

        fetch(todayWeathetUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (renderWeather) {
            $("main-row").empty();
            console.log(renderWeather)

            var todayHumidity = (renderWeather.main.humidity);
            var todayTemp = (renderWeather.main.temp);
            var todayWind = (renderWeather.wind.speed);

            var coltoday = $("<div>").addClass("col-sm-12");
            var cardtoday = $("<div>").addClass("card");
            var cardtodayBody = $("<div>").addClass("card-body");
            var cardtodayHumidity = $("<div>").addClass("card-humidity");
            var cardtodayTemp = $("<div>").addClass("card-temp");
            var cardtodayWind = $("<div>").addClass("card-wind");

            cardtodayHumidity.text("Humidity: " + todayHumidity + " %");
            cardtodayTemp.text("Temp: " + todayTemp + " F");
            cardtodayWind.text("Wind: " + todayWind + " MPH");

            cardtodayBody
              .append(cityReturn + currentDay)
              .append(cardtodayTemp)
              .append(cardtodayWind)
              .append(cardtodayHumidity);

            cardtoday
              .append(cardtodayBody);

            coltoday
              .append(cardtoday)

            $("#today-weather").append(coltoday);
          })

        var colforecastTitle = $("<h2>").addClass("col-sm-12 ")
        colforecastTitle.text("5 days forecast:")
        $("#forecast-weather").append(colforecastTitle);

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

        fetch(forecastUrl)
          .then(function (response) {
            return response.json();
          })

          .then(function (forecastData) {
            console.log(forecastData)
            $("main-row").empty();
            for (var i = 0; i < forecastData.list.length; i += 8) {

              // var dtTimeStamp = (forecastData.list[i].clouds.dt)
              // console.log(dtTimeStamp)
              // var forecastDate = toDateString(dtTimeStamp)

              // var icon = (forecastData.list[i].weather[i].icon);
              // console.log(forecastData.list[i].weather[i]);
              // console.log(icon);


              // var forecastIcon = (src="https://openweathermap.org/img/wn/" + icon + "@2x.png")
              var forecastTemp = (forecastData.list[i].main.temp);
              var forecastWind = (forecastData.list[i].wind.speed);
              var forecastHumidity = (forecastData.list[i].main.humidity);


              var colforecast = $("<div>").addClass("col border");
              var cardforecast = $("<div>").addClass("card border");
              var cardBodyforecast = $("<div>").addClass("card-body border");
              var cardforecastTemp = $("<div>").addClass("card-temp");
              // var cardForecastIcon = $("<img>").addClass("card-icon")
              var cardforecastWind = $("<div>").addClass("card-wind");
              var cardforecastHumidity = $("<div>").addClass("card-humidity");

              // cardForecastIcon.attr(forecastIcon)
              cardforecastHumidity.text("Humidity: " + forecastHumidity + " %");
              cardforecastTemp.text("Temp: " + forecastTemp + " F");
              cardforecastWind.text("Wind: " + forecastWind + " MPH");

              cardBodyforecast

                // .append(cardForecastIcon)
                .append(cardforecastTemp)
                .append(cardforecastWind)
                .append(cardforecastHumidity)

              cardforecast
                .append(cardBodyforecast)

              colforecast
                .append(cardforecast)

              $("#forecast-weather").append(colforecast);
            }
          })
      })
  })
});




