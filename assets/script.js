// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`

//  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=raleigh&appid=4f112ad8f388d7d13afdcbf2472fed94"
var currentDay = dayjs().format(" M/D/YYYY");
// console.log(currentDay);
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
      console.log(data)
      for (var i = 0; i < data.length; i++) {
        var cityReturn = (data[i].name)
        var latitude = (data[i].lat);
        // console.log(latitude);
        var longitude = (data[i].lon);
        // console.log(longitude);
        var theUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey;
        //  console.log(theUrl);
        $("#city-date").append(cityReturn + (currentDay))
        
        fetch(theUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
              console.log(data);
              for (var i = 0; i < data.length; i++) {
                console.log(data[i].main.weather.icon);
              }

            })
            .catch(function (error) {
              console.log(error);
            });
        }
      })

  })
 
});







