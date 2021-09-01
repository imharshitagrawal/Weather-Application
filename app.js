const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));
app.use(bodyParser.json());

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/getWeather", async function(req, res) {
  city = req.body['city'];
  console.log(city);
  let respObj = {
    "status": 500,
    "temp": 10,
    "temp_min": 10,
    "temp_max": 10,
    "country": 'country',
    "city": 'city',
    "icon":'icon',
    "description": 'desc'
  };
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1b60a4179b3ef11e9a5d26fdf0ff7b36&units=metric";
  https.get(url, function(response) {
    console.log(response.statusCode);
    if (response.statusCode == 200) {
      respObj.status = 200;
      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        respObj.temp = weatherData.main.temp;
        respObj.temp_max = weatherData.main.temp_max;
        respObj.temp_min = weatherData.main.temp_min;
        respObj.country = weatherData.sys.country;
        respObj.city = weatherData.name;
        respObj.description = weatherData.weather[0].main;
        respObj.icon = weatherData.weather[0].icon;
        res.send(respObj);
      });
    } else
      res.send(respObj);
  });

});






app.listen(3000, function() {
  console.log("Server has started");
});
