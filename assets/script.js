// `https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}`

//  var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=raleigh&appid=4f112ad8f388d7d13afdcbf2472fed94"

var apiKey = "4f112ad8f388d7d13afdcbf2472fed94";

$(function() {
     
  $(".btn").on("click", function(event) {
    event.preventDefault();
    var cityName = $("#cityNameInput").val();
    var requestUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;


fetch(requestUrl)
  .then(function (response) {
    return response.json();
  
  })
  .then(function(data) {
    for (var i = 0; i < data.length; i++) {
      var lat = (data[i].lat);
       console.log(lat);
      var lon = (data[i].lon);
       console.log(lon);
      // var theUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey;
  }
      })

      fetch(theUrl)
      .then(function (response) {
        return response.json();
      console.log(theUrl);
      })
     

   })
  // .catch(function (error) {
    // console.log(error);
  });
//  });






