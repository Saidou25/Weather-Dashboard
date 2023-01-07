
var apiKey = "4f112ad8f388d7d13afdcbf2472fed94";
var cityName = $("#cityNameInput").val();
var todayWeather = (function (response) {

  var cityName = (response.name);
  var todayDate = (response.dt);

  var date = new Date(todayDate * 1000);
  var todayDateinfo = (date.toLocaleDateString('en-US'));

  var mainIcon = (response.weather[0].icon);
  var todayIcon = ("https://openweathermap.org/img/wn/" + mainIcon + "@2x.png");
  var todayTemp = (response.main.temp);
  var todayHumidity = (response.main.humidity);
  var todayWind = (response.wind.speed);

  var colToday = $("<div>").addClass("col-sm-12");
  var cardToday = $("<div>").addClass("card");
  var cardTodayBody = $("<div>").addClass("card-body");
  var cardcityName = $("<h3>").addClass("card-title");
  var cardTodayIcon = $("<img/>").addClass("card-icon");
  var cardTodayTemp = $("<div>").addClass("card-temp");
  var cardTodayHumidity = $("<div>").addClass("card-humidity");
  var cardTodayWind = $("<div>").addClass("card-wind");

  cardcityName.text(cityName + " " + "(" + todayDateinfo + ")");
  cardTodayIcon.attr("src", todayIcon);
  cardTodayTemp.text("Temp: " + todayTemp + " F");
  cardTodayHumidity.text("Humidity: " + todayHumidity + " %");
  cardTodayWind.text("Wind: " + todayWind + " MPH");

  cardTodayBody
    .append(cardcityName)
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

    var forecastDate = (data.list[i].dt_txt);
    const foreDate = new Date(forecastDate);
    var forecastDateinfo = (foreDate.toLocaleDateString('en-US'));
    var icon = (data.list[i].weather[0].icon);
    var forecastIcon = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
    var forecastTemp = (data.list[i].main.temp);
    var forecastWind = (data.list[i].wind.speed);
    var forecastHumidity = (data.list[i].main.humidity);

    var colforecast = $("<div>").addClass("col");
    var cardforecast = $("<div>").addClass("card bg-primary text-white");
    var cardBodyforecast = $("<div>").addClass("card-body");
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

var forecastTitle = function () {
  var colforecastTitle = $("<h4>").addClass("col-sm-12 ");
  colforecastTitle.text("5-Day Forecast:");
  $("#forecast-weather").append(colforecastTitle);
};

var savedBtn = function (searchedCity) {
  var colSavedBtn = $("<div>").addClass("col saved-btn d-grid gap-2");
  var savedBtn = $("<button>").addClass("btn-space m-2 btn-secondary rounded");

  savedBtn.text(searchedCity);
  colSavedBtn.append(savedBtn);

  $(".row-btn-saved").append(colSavedBtn);
};

var fetchWeather = function (cityName) {

  var requestUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;

  fetch(requestUrl)
    .then(function (response) {
      return response.json();

    })
    .catch(function (error) {
      alert('Unable to connect to server');
    })

    .then(function (data) {

      for (var i = 0; i < data.length; i++) {
        var searchedCity = data[i].name;
        var latitude = (data[i].lat);
        var longitude = (data[i].lon);
        var todayWeathetUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";
        var history = JSON.parse(localStorage.getItem("searched")) || []

        if (!history.includes(searchedCity)) {

          history.push(searchedCity);
          localStorage.setItem("searched", JSON.stringify(history));
          $("#cityNameInput").val("");
          savedBtn(searchedCity);

        };


        fetch(todayWeathetUrl)
          .then(function (response) {
            if (response.ok) {
              response.json().then(todayWeather);
            } else {
              alert('Error: ' + response.statusText);
            }
          })
          .catch(function (error) {
            alert('Unable to connect to server');
          });

        var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

        fetch(forecastUrl)
          .then(function (response) {
            if (response.ok) {
              response.json().then(forecastWeather);
            } else {
              alert('Error: ' + response.statusText);
            }
          })
          .catch(function (error) {
            alert('Unable to connect to server');
          });
      }
    })
};

$(".btn-primary").on("click", function (event) {
  event.preventDefault();
  $("#today-weather").empty();
  $("#forecast-weather").empty();
  var cityName = $("#cityNameInput").val();
  if (!cityName) {
    alert('Please enter a valid city.');
  }
  fetchWeather(cityName);
  forecastTitle();
  $("#cityNameInput").val("");
});

$(".row-btn-saved").on("click", "div", function (e) {
  $("#today-weather").empty();
  $("#forecast-weather").empty();

  fetchWeather(e.currentTarget.textContent);
  forecastTitle();
});

















