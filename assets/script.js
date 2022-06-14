let userInput = document.querySelector(".userInput");


// get weather button
let weatherBtn = document.querySelector(".weatherBtn")
weatherBtn.addEventListener("click", function () {
  // divide user input into lat and lon
  userInput.value.split(",")
  let lat = userInput.value.split(", ")[0]
  let lon = userInput.value.split(", ")[1]

  getTemperature(lat, lon)
});


// get weather function
let getWeather = (lat, lon) => {
  const APIKey = "1eb784753dd9691347d2b905eeeffc69";
  const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + '&exclude=hourly,minutely,alerts&appid=' + APIKey;

  fetch(weatherAPI).then(function (response) {
    response.json().then(function (data) {
      console.log(data)
    });
  });
};

// display temperature function

let getTemperature = (lat, lon) => {
  const APIKey = "1eb784753dd9691347d2b905eeeffc69";
  const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + '&exclude=hourly,minutely,alerts&appid=' + APIKey;

  fetch(weatherAPI).then(function (response) {
    response.json().then(function (data) {

      let weatherEl = document.querySelector(".weatherInfo");

      // display timezone
      let timezone = document.createElement("div");
      weatherEl.appendChild(timezone);
      timezone.innerHTML = data.timezone;

      // display current temperature for timezone
      let temperature = document.createElement("div");
      weatherEl.appendChild(temperature);
      temperature.innerHTML = "The current temperature is " + data.current.temp + " degrees Fahrenheit";
      console.log(data)

      // loop through 5 days to get temp
      for (i = 0; i < 5; i++) {
        // display temp for next 5 days
        let fiveDayForecastTemp = document.createElement("div");
        fiveDayForecastTemp.className = "dailyWeather"
        weatherEl.appendChild(fiveDayForecastTemp);
        fiveDayForecastTemp.innerHTML = "low of " + data.daily[i].temp.min + " and a high of " + data.daily[i].temp.max;     
      };




    });
  });
  ;
}

// display city name

// display date

// display humidity

//display wind speed

//display weather conditions


let getForecast = (city) => {
  const APIKey = "1eb784753dd9691347d2b905eeeffc69";
  const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?&q=" + city + "&exclude=country&appid=" + APIKey;

  fetch(weatherAPI).then(function (response) {
    response.json().then(function (data) {
      console.log(data)
    });
  });
};




