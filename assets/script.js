
var apiKey = "4f112ad8f388d7d13afdcbf2472fed94";

var todayWeather = (function (data) {
  console.log(data);

  var todayTitle = (data.name);
  var todayDate = (data.dt);

  var date = new Date(todayDate * 1000);
  var todayDateinfo = (date.toLocaleDateString('en-US'));

  var mainIcon = (data.weather[0].icon);
  var todayIcon = ("https://openweathermap.org/img/wn/" + mainIcon + "@2x.png");
  var todayTemp = (data.main.temp);
  var todayHumidity = (data.main.humidity);
  var todayWind = (data.wind.speed);

  var colToday = $("<div>").addClass("col-sm-12");
  var cardToday = $("<div>").addClass("card");
  var cardTodayBody = $("<div>").addClass("card-body");
  var cardtodayTitle = $("<h3>").addClass("card-title");
  var cardTodayIcon = $("<img/>").addClass("card-icon");
  var cardTodayTemp = $("<div>").addClass("card-temp");
  var cardTodayHumidity = $("<div>").addClass("card-humidity");
  var cardTodayWind = $("<div>").addClass("card-wind");


  cardtodayTitle.text(todayTitle + " " + "(" + todayDateinfo + ")");
  cardTodayIcon.attr("src", todayIcon);
  cardTodayTemp.text("Temp: " + todayTemp + " F");
  cardTodayHumidity.text("Humidity: " + todayHumidity + " %");
  cardTodayWind.text("Wind: " + todayWind + " MPH");

  cardTodayBody
    .append(cardtodayTitle)
    .append(cardTodayIcon)
    .append(cardTodayTemp)
    .append(cardTodayWind)
    .append(cardTodayHumidity);

  cardToday
    .append(cardTodayBody);

  colToday
    .append(cardToday);

  $("#today-weather").append(colToday);
});

var forecastWeather = function (data) {
  $("forecast-weather").empty();


  for (var i = 0; i < data.list.length; i += 8) {

    var forecastDate = (data.list[i].dt);

    const foreDate = new Date(forecastDate * 1000);
    var forecastDateinfo = (foreDate.toLocaleDateString('en-US'));
    console.log(forecastDateinfo);

    var icon = (data.list[i].weather[0].icon);
    var forecastIcon = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
    var forecastTemp = (data.list[i].main.temp);
    var forecastWind = (data.list[i].wind.speed);
    var forecastHumidity = (data.list[i].main.humidity);

    var colforecast = $("<div>").addClass("col border");
    var cardforecast = $("<div>").addClass("card border");
    var cardBodyforecast = $("<div>").addClass("card-body border");
    var cardforecastDate = $("<div>").addClass("card-date");
    var cardForecastIcon = $("<img/>").addClass("card-icon");
    var cardforecastTemp = $("<div>").addClass("card-temp");
    var cardforecastWind = $("<div>").addClass("card-wind");
    var cardforecastHumidity = $("<div>").addClass("card-humidity");

    cardforecastDate.text(forecastDate);
    cardForecastIcon.attr("src", forecastIcon);
    cardforecastHumidity.text("Humidity: " + forecastHumidity + " %");
    cardforecastTemp.text("Temp: " + forecastTemp + " F");
    cardforecastWind.text("Wind: " + forecastWind + " MPH");

    cardBodyforecast
      .append(forecastDateinfo)
      .append(cardForecastIcon)
      .append(cardforecastTemp)
      .append(cardforecastWind)
      .append(cardforecastHumidity);

    cardforecast
      .append(cardBodyforecast);

    colforecast
      .append(cardforecast);

    $("#forecast-weather").append(colforecast);
  }
};

var fetchWeather = function () {

  var cityName = $("#cityNameInput").val();
  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();

    })
    .then(function (data) {

      for (var i = 0; i < data.length; i++) {

        var cityReturn = data[0].name

        var latitude = (data[i].lat);
        var longitude = (data[i].lon);

        var todayWeathetUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

        fetch(todayWeathetUrl)
          .then(function (response) {
            if (response.ok) {

              response.json().then(todayWeather)
            }
          })

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

        fetch(forecastUrl)
          .then(function (response) {
            if (response.ok) {
              response.json().then(forecastWeather);
            }
          })
      }
    })
}

$(".btn-primary").on("click", function () {
  $("#today-weather").empty();
  $("#forecast-weather").empty();

  fetchWeather()

  var cityName = $("#cityNameInput").val();
  var history = JSON.parse(localStorage.getItem("searched")) || []

  history.push(cityName)
  localStorage.setItem("searched", JSON.stringify(history))

  var colforecastTitle = $("<h2>").addClass("col-sm-12 ")
  colforecastTitle.text("5 days forecast:")
  $("#forecast-weather").append(colforecastTitle)

  var colSavedBtn = $("<div>").addClass("col-saved-btn")
  var savedBtn = $("<button>").addClass("btn btn-secondary")


  savedBtn.append(cityName)
  colSavedBtn.append(savedBtn)

  $(".row-btn-saved").append(colSavedBtn);

  $("#cityNameInput").val("");
  $(".btn-secondary").on("click", function () {
    console.log("hello");
  })
});















