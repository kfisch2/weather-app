let userInput = document.querySelector(".userInput");

// list previously searched cities
// for (i = 0; i < localStorage.getItem("Search-cities".length); i++) {
//   let searcHistory = document.querySelector(".previousSearch");
//   cityItem = document.createElement("li");
//   searcHistory.appendChild(cityItem);
//   cityItem.innerHTML = localStorage.getItem("Search-cities", JSON.stringify(citySearches) )
// }

// local storage for searched cities
let storeCity = (city) => {
  var citySearches = JSON.parse(localStorage.getItem("Searched-cities")) || [];
  if (!localStorage.getItem("Searched-cities")) {
    localStorage.setItem("Searched-cities", citySearches);
  }

  citySearches.push(city);
  localStorage.setItem("Searched-cities", JSON.stringify(citySearches));
};

// get weather button
let weatherBtn = document.querySelector(".weatherBtn");
weatherBtn.addEventListener("click", function () {
  let userCity = userInput.value;
  storeCity(userCity);

  //change to userCity
  getLatAndLon(userCity);
  let weatherContainer = document.querySelector(".weatherContainer");
  weatherContainer.style.display = "block";
});

// convert userCity to lat and lon
let getLatAndLon = (city) => {
  const APIKey = "1eb784753dd9691347d2b905eeeffc69";
  const weatherAPI =
    "https://api.openweathermap.org/data/2.5/forecast?&q=" +
    city +
    "&exclude=country&appid=" +
    APIKey;

  fetch(weatherAPI).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        let lat = data.city.coord.lat;
        let lon = data.city.coord.lon;
        getTemperature(lat, lon);

        // add city to previous search bar
        let userCity = userInput.value;
        let previousSearchEl = document.querySelector(".previousSearch");
        let previousSearch = document.createElement("li");

        // user clicks previous city
        previousSearch.addEventListener("click", function () {
          getLatAndLon(previousSearch.textContent);
        });

        previousSearch.textContent = userCity.toUpperCase();
        previousSearch.className = "searchedCity";
        previousSearchEl.appendChild(previousSearch);
      });
    } else {
      alert("please enter a city");
    }
  });
};

// display temperature function
let getTemperature = (lat, lon) => {
  const APIKey = "1eb784753dd9691347d2b905eeeffc69";
  const weatherAPI =
    "https://api.openweathermap.org/data/2.5/onecall?units=imperial&lat=" +
    lat +
    "&lon=" +
    lon +
    "&exclude=hourly,minutely,alerts&appid=" +
    APIKey;

  fetch(weatherAPI).then(function (response) {
    response.json().then(function (data) {
      let d = new Date();
      let currentDate =
        d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

      // current weather function
      let currentWeather = () => {
        // current weather info
        let currentWeatherEl = document.querySelector(".currentWeather");
        currentWeatherEl.textContent = "";
        let currentWeatherInfo = document.createElement("div");
        currentWeatherEl.appendChild(currentWeatherInfo);

        // city name
        let cityName = document.createElement("div");
        currentWeatherInfo.appendChild(cityName);
        cityName.id = "cityName";
        cityName.textContent =
          userInput.value.toUpperCase() + " (" + currentDate + ")";

        // uv index
        let uvIndex = document.createElement("span");
        currentWeatherInfo.appendChild(uvIndex);
        let uvRead = data.daily[0].uvi;

        uvIndex.innerHTML = "UV Index: " + uvRead;

        // uv index background color function
        let uvColor = () => {
          if (uvRead >= 8) {
            uvIndex.className = "very-high";
          } else if (uvRead >= 6) {
            uvIndex.className = "high";
          } else if (uvRead >= 3) {
            uvIndex.className = "moderate";
          } else if (uvRead <= 2) {
            uvIndex.className = "low";
          }
        };

        uvColor();

        // max temp
        let maxTemp0 = document.createElement("div");
        currentWeatherInfo.appendChild(maxTemp0);
        maxTemp0.innerHTML = "High temp: " + data.daily[0].temp.max + " °F";

        // min temp
        let minTemp0 = document.createElement("div");
        currentWeatherInfo.append(minTemp0);
        minTemp0.innerHTML = "Low temp: " + data.daily[0].temp.min + " °F";

        // humidity
        let humidity0 = document.createElement("div");
        currentWeatherInfo.appendChild(humidity0);
        humidity0.innerHTML = "Humidity: " + data.daily[0].humidity + "%";

        // wind speed
        let wind0 = document.createElement("div");
        currentWeatherInfo.appendChild(wind0);
        wind0.innerHTML = "Wind: " + data.daily[0].wind_speed + " mph";

        // weather conditions
        let conditions0 = document.createElement("div");
        currentWeatherInfo.appendChild(conditions0);
        conditions0.innerHTML =
          "Current conditions: " + data.current.weather[0].description;

        // weather icon
        let spanIcon = document.createElement("span");
        let weatherIcon = document.createElement("img");
        weatherIcon.className = "currentWeatherIcon";
        spanIcon.appendChild(weatherIcon);
        currentWeatherInfo.appendChild(spanIcon);
        weatherIcon.src =
          "https://openweathermap.org/img/wn/" +
          data.current.weather[0].icon +
          "@2x.png";
      };

      // 5 day forecast
      let forecast = () => {
        for (i = 1; i < 6; i++) {
          let dayContainer = document.querySelector(`.day${i}`);
          dayContainer.innerHTML = "";

          // date
          let newDate = document.createElement("div");
          dayContainer.appendChild(newDate);
          d.setDate(d.getDate() + 1);
          newDate.innerHTML =
            d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
          newDate.style.fontWeight = "bold";
          newDate.style.color = "black";
          newDate.style.backgroundColor = "lightgray";
          newDate.style.borderRadius = "2px";
          newDate.style.marginTop = "5px";

          // max temp
          let maxTemp = document.createElement("div");
          dayContainer.appendChild(maxTemp);
          maxTemp.innerHTML = "High temp: " + data.daily[i].temp.max + " °F";

          // min temp
          let minTemp = document.createElement("div");
          dayContainer.append(minTemp);
          minTemp.innerHTML = "Low temp: " + data.daily[i].temp.min + " °F";

          // humidity
          let humidity = document.createElement("div");
          dayContainer.appendChild(humidity);
          humidity.innerHTML = "Humidity: " + data.daily[i].humidity + "%";

          // wind speed
          let wind = document.createElement("div");
          dayContainer.appendChild(wind);
          wind.innerHTML = "Wind: " + data.daily[i].wind_speed + " mph";

          // weather conditions
          let conditions = document.createElement("div");
          dayContainer.appendChild(conditions);
          conditions.innerHTML =
            "Conditions: " + data.daily[i - 1].weather[0].description;

          // weather icon
          let spanIcon = document.createElement("span");
          let weatherIcon = document.createElement("img");
          spanIcon.appendChild(weatherIcon);
          dayContainer.appendChild(spanIcon);
          weatherIcon.src =
            "https://openweathermap.org/img/wn/" +
            data.daily[i - 1].weather[0].icon +
            "@2x.png";
        }
      };


      currentWeather();
      forecast();
    });
  });
};
