
var requestUrl = "https://api.openweathermap.org/data/2.5/weather?q=London&appid=4f112ad8f388d7d13afdcbf2472fed94"

fetch(requestUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
  })
  .catch(function (error) {
    console.log(error);
  });


//   4f112ad8f388d7d13afdcbf2472fed94
// 4b03013a438c0f5c7a7400d32f63cd69