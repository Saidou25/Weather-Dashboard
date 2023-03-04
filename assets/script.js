
var apiKey = "4f112ad8f388d7d13afdcbf2472fed94";
var cityName = $("#cityNameInput").val();

// ------------------------ todayWeather generates a card with weather info ---------------
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

  var colToday = $("<div>").addClass("col-12");
  var cardToday = $("<div>").addClass("card-overlay-today");
  var cardTodayBody = $("<div>").addClass("card-body");
  var cardcityName = $("<h3>").addClass("card-title");
  var cardTodayIcon = $("<img/>").addClass("card-icon");
  var cardTodayTemp = $("<div>").addClass("card-temp pt-2");
  var cardTodayHumidity = $("<div>").addClass("card-humidity pt-2");
  var cardTodayWind = $("<div>").addClass("card-wind pt-2");

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
// ------------------------ // --------------------------------

// ------------------------ forecastWeather generates a card with forecast weather info ---------------
var forecastWeather = function (data) {
  $("forecast-weather").empty();

  for (var i = 0; i < data.list.length; i += 8) {

    var forecastDate = (data.list[i].dt_txt);
    const foreDate = new Date(forecastDate);
    var forecastDate = (foreDate.toLocaleDateString('en-US'));
    var icon = (data.list[i].weather[0].icon);
    var forecastIcon = ("https://openweathermap.org/img/wn/" + icon + "@2x.png");
    var forecastTemp = (data.list[i].main.temp);
    var forecastWind = (data.list[i].wind.speed);
    var forecastHumidity = (data.list[i].main.humidity);

    var colforecast = $("<div>").addClass("col colforecast");
    var cardforecast = $("<div>").addClass("card-overlay");
    var cardBodyforecast = $("<div>").addClass("card-body");
    var cardforecastDate = $("<div>").addClass("card-forecastDate");
    var cardForecastIcon = $("<img/>").addClass("card-icon");
    var cardforecastTemp = $("<div>").addClass("card-temp pt-2");
    var cardforecastWind = $("<div>").addClass("card-wind pt-2");
    var cardforecastHumidity = $("<div>").addClass("card-humidity pt-2");

    cardforecastDate.text(forecastDate);
    cardForecastIcon.attr("src", forecastIcon);
    cardforecastHumidity.text("Humidity: " + forecastHumidity + " %");
    cardforecastTemp.text("Temp: " + forecastTemp + " F");
    cardforecastWind.text("Wind: " + forecastWind + " MPH");

    cardBodyforecast
      .append(cardforecastDate)
      .append(cardForecastIcon)
      .append(cardforecastTemp)
      .append(cardforecastWind)
      .append(cardforecastHumidity);

    cardforecast
      .append(cardBodyforecast)

    colforecast
      .append(cardforecast);

    $("#forecast-weather").append(colforecast);
  }
};
// ------------------------ // --------------------------------

// ------------------------ generates 5- day forecast title --------------------------------
var forecastTitle = function () {
  var colforecastTitle = $("<h3>").addClass("col-12 text-white pt-5 pb-5");
  colforecastTitle.text("5-Day Forecast:");
  $("#forecast-weather").append(colforecastTitle);
};
// ------------------------ // --------------------------------

// ------------------------ generates buttons for saved cities --------------------------------
var savedBtn = function (searchedCity) {
  var colSavedBtn = $("<div>").addClass("col-12 s-3");
  var savedBtn = $("<button>").addClass("btn-secondary mt-2 mb-2 rounded");

  savedBtn.text(searchedCity);
  colSavedBtn.append(savedBtn);

  $(".row-btn-saved").append(colSavedBtn);
};
// ------------------------ // --------------------------------

// ------------------------ fetch and builts urls--------------------------------
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
        // ------------------------ save cities to localstorage if they are not already saved -------------------------------- 
        var history = JSON.parse(localStorage.getItem("searched")) || []

        if (!history.includes(searchedCity)) {

          history.push(searchedCity);
          localStorage.setItem("searched", JSON.stringify(history));
          $("#cityNameInput").val("");
          savedBtn(searchedCity);

        };
        //  ------------------------ save cities to localstorage if they are not already saved -------------------------------- 

        fetch(todayWeathetUrl)
          .then(function (response) {
            if (response.ok) {
              response.json().then(todayWeather);//sends data to todayWeather() to generate cards
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
              response.json().then(forecastWeather);//sends data to forecastWeather() to generate cards
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
// ------------------------ // --------------------------------

// ------------------------ init the all fetching operation  and creates save buttons--------------------------------
$(".btn-primary-overlay").on("click", function (event) {
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
// ------------------------ // --------------------------------

// ------------------------ access saved cities from localStorage --------------------------------
$(".row-btn-saved").on("click", "div", function (e) {
  $("#today-weather").empty();
  $("#forecast-weather").empty();

  fetchWeather(e.currentTarget.textContent);
  forecastTitle();
});
// ------------------------ // --------------------------------
















