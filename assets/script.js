let userInput = document.querySelector(".userInput");


// get weather button
let weatherBtn = document.querySelector(".weatherBtn")
weatherBtn.addEventListener("click", function () {
  let userCity = userInput.value;


  //change to userCity
  getLatAndLon(userCity);
});

// convert userCity to lat and lon
let getLatAndLon = (city) => {
  const APIKey = "1eb784753dd9691347d2b905eeeffc69";
  const weatherAPI = "https://api.openweathermap.org/data/2.5/forecast?&q=" + city + "&exclude=country&appid=" + APIKey;

  fetch(weatherAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let lat = data.city.coord.lat;
        let lon = data.city.coord.lon;
        getTemperature(lat, lon)

        // add city to previous search bar
        let userCity = userInput.value;
        let previousSearchEl = document.querySelector(".previousSearch");
        let previousSearch = document.createElement("li");
        previousSearch.textContent = userCity.toUpperCase();
        previousSearchEl.appendChild(previousSearch);
      });
    } else {
      alert("please enter a US city")
    }

  });
};



// display temperature function
let getTemperature = (lat, lon) => {
  const APIKey = "1eb784753dd9691347d2b905eeeffc69";
  const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + '&exclude=hourly,minutely,alerts&appid=' + APIKey;

  fetch(weatherAPI).then(function (response) {
    response.json().then(function (data) {
      let d = new Date();
      let currentDate = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

      // current weather function
      let currentWeather = () => {
        // current weather info

        let currentWeatherEl = document.querySelector(".currentWeather")
        currentWeatherEl.textContent = "";
        let currentWeatherInfo = document.createElement("div");
        currentWeatherEl.appendChild(currentWeatherInfo);
       
        

        // city name
        let cityName = document.createElement("div");
        currentWeatherInfo.appendChild(cityName);
        cityName.textContent = userInput.value.toUpperCase() + " (" + currentDate + ")";

        // weather icon
        // if statement 

        // uv index
        let uvIndex0 = document.createElement("div");
        currentWeatherInfo.appendChild(uvIndex0);
        uvIndex0.innerHTML = "UV Index: " + data.daily[0].uvi;

        // max temp
        let maxTemp0 = document.createElement("div");
        currentWeatherInfo.appendChild(maxTemp0);
        maxTemp0.innerHTML = "High temp: " + data.daily[0].temp.max;

        // min temp
        let minTemp0 = document.createElement("div");
        currentWeatherInfo.append(minTemp0);
        minTemp0.innerHTML = "Low temp: " + data.daily[0].temp.min;

        // humidity 
        let humidity0 = document.createElement("div");
        currentWeatherInfo.appendChild(humidity0);
        humidity0.innerHTML = "Humidity: " + data.daily[0].humidity + "%";

        // wind speed
        let wind0 = document.createElement("div");
        currentWeatherInfo.appendChild(wind0);
        wind0.innerHTML = "Wind: " + data.daily[0].wind_speed + " mph"

        // weather conditions
        let conditions0 = document.createElement("div");
        currentWeatherInfo.appendChild(conditions0);
        conditions0.innerHTML = "Conditions: " + data.daily[0].weather[0].description;
      };


      //DAY ONE INFO
      let dayOne = () => {
        let dayOneContainer = document.querySelector(".day1");
        dayOneContainer.innerHTML = "";

        // date 
        let newDate1 = document.createElement("div");
        dayOneContainer.appendChild(newDate1);
        d.setDate(d.getDate() + 1)
        newDate1.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();



        // uv index
        let uvIndex1 = document.createElement("div");
        dayOneContainer.appendChild(uvIndex1);
        uvIndex1.innerHTML = "UV Index: " + data.daily[1].uvi;

        // max temp
        let maxTemp1 = document.createElement("div");
        dayOneContainer.appendChild(maxTemp1);
        maxTemp1.innerHTML = "High temp: " + data.daily[1].temp.max;

        // min temp
        let minTemp1 = document.createElement("div");
        dayOneContainer.append(minTemp1);
        minTemp1.innerHTML = "Low temp: " + data.daily[1].temp.min;

        // humidity 
        let humidity1 = document.createElement("div");
        dayOneContainer.appendChild(humidity1);
        humidity1.innerHTML = "Humidity: " + data.daily[1].humidity + "%";

        // wind speed
        let wind1 = document.createElement("div");
        dayOneContainer.appendChild(wind1);
        wind1.innerHTML = "Wind: " + data.daily[1].wind_speed + " mph"

        // weather conditions
        let conditions1 = document.createElement("div");
        dayOneContainer.appendChild(conditions1);
        conditions1.innerHTML = "Conditions: " + data.daily[1].weather[0].description;
      };

      let dayTwo = () => {
        // DAY TWO INFO
        let dayTwoContainer = document.querySelector(".day2");
        dayTwoContainer.innerHTML = "";

        // date 
        let newDate2 = document.createElement("div");
        dayTwoContainer.appendChild(newDate2);
        d.setDate(d.getDate() + 1)
        newDate2.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

        // uv index
        let uvIndex2 = document.createElement("div");
        dayTwoContainer.appendChild(uvIndex2);
        uvIndex2.innerHTML = "UV Index: " + data.daily[2].uvi;

        // max temp
        let maxTemp2 = document.createElement("div");
        dayTwoContainer.appendChild(maxTemp2);
        maxTemp2.innerHTML = "High temp: " + data.daily[2].temp.max;

        // min temp
        let minTemp2 = document.createElement("div");
        dayTwoContainer.append(minTemp2);
        minTemp2.innerHTML = "Low temp: " + data.daily[2].temp.min;

        // humidity 
        let humidity2 = document.createElement("div");
        dayTwoContainer.appendChild(humidity2);
        humidity2.innerHTML = "Humidity: " + data.daily[2].humidity + "%";

        // wind speed
        let wind2 = document.createElement("div");
        dayTwoContainer.appendChild(wind2);
        wind2.innerHTML = "Wind: " + data.daily[2].wind_speed + " mph"

        // weather conditions
        let conditions2 = document.createElement("div");
        dayTwoContainer.appendChild(conditions2);
        conditions2.innerHTML = "Conditions: " + data.daily[2].weather[0].description;
      };
      currentWeather();
      dayOne();
      dayTwo();
    });

  });
  ;
}






// get weather function
// let getWeather = (lat, lon) => {
//   const APIKey = "1eb784753dd9691347d2b905eeeffc69";
//   const weatherAPI = "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" + lat + "&lon=" + lon + '&exclude=hourly,minutely,alerts&appid=' + APIKey;
//   fetch(weatherAPI).then(function (response) {
//     response.json().then(function (data) {
//       // display current temperature
//       let temperature = document.createElement("div");
//       weatherEl.appendChild(temperature);
//       temperature.innerHTML = "The current temperature is " + data.current.temp + " degrees Fahrenheit";
//       console.log(data)
//       for (i = 0; i < 5; i++) {

//         console.log(data.daily[i].temp)
//       }
//     });
//   });
// };
