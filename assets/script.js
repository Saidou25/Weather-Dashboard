// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`
// http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
//  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=raleigh&appid=4f112ad8f388d7d13afdcbf2472fed94"

// var forecastUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";





var currentDay = dayjs().format(" (M/D/YYYY)");
var apiKey = "4f112ad8f388d7d13afdcbf2472fed94";

$(function () {

  $(".btn").on("click", function (event) {
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
          var todayUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&units=imperial";

          fetch(todayUrl)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              console.log(data)
              $("today-card").empty();
              // for (var i = 0; i < data.list.length; i++) {


                var todayHumidity = (data.main.humidity);
                var todayTemp = (data.main.temp);
                var todayWind = (data.wind.speed);
                // var todayTimeZone = (data.city.timezone);


                var col = $("<div>").addClass("col-12");
                var card = $("<div>").addClass("card");
                var cardBody = $("<div>").addClass("card-body");
                var cardHumidity = $("<div>").addClass("card-humidity");
                var cardTemp = $("<div>").addClass("card-temp");
                var cardWind = $("<div>").addClass("card-wind");

                cardHumidity.text(todayHumidity + " %");
                cardTemp.text(todayTemp + " F");
                cardWind.text(todayWind + " MPH");

                cardBody
                  .append(cityReturn + currentDay)
                  .append(cardTemp)
                  .append(cardWind)
                  .append(cardHumidity);

                card
                  .append(cardBody);

                col
                  .append(card);

                $("#today-card").append(col);
              }

            )
            // .catch(function (error) {
            //   console.log(error);
            // });
        }
      })
  })
});


// var todayHumidity = (data.list[1].main.humidity);
// var todayTemp = (data.list[1].main.temp);
// var todayWind = (data.list[1].wind.speed);
// var todayTimeZone = (data.city.timezone);

