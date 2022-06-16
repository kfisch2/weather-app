let userInput = document.querySelector(".userInput");

// list previously searched cities
let searcHistory = document.querySelector(".previousSearch");
cityItem = document.createElement("li");

searcHistory.textContent = localStorage.getItem("Searched cities")
searcHistory.style.backgroundColor = "grey"



// local storage for searched cities
var citySearches = [];
let storeCity = () => {
  citySearches.push(userInput.value)
  localStorage.setItem("Searched cities", citySearches)
}



// get weather button
let weatherBtn = document.querySelector(".weatherBtn")
weatherBtn.addEventListener("click", function () {
  storeCity();
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



        // user clicks previous city
        previousSearch.addEventListener("click", function () {
          getLatAndLon();
        })


        previousSearch.textContent = userCity.toUpperCase();
        previousSearch.className = "searchedCity"
        previousSearchEl.appendChild(previousSearch);



      });



    } else {
      alert("please enter a city")
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

      console.log(data)
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
        cityName.id = "cityName"
        cityName.textContent = userInput.value.toUpperCase() + " (" + currentDate + ")";


        // uv index
        let uvIndex = document.createElement("span");
        currentWeatherInfo.appendChild(uvIndex);
        let uvRead = data.daily[0].uvi;

        uvIndex.innerHTML = "UV Index: " + uvRead;

        // uv index background color function
        let uvColor = () => {
          if (uvRead >= 8) {
            uvIndex.className = "very-high"
          } else if (
            uvRead >= 6) {
            uvIndex.className = "high"
          } else if (
            uvRead >= 3) {
            uvIndex.className = "moderate"
          } else if (uvRead <= 2) {
            uvIndex.className = "low"
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
        wind0.innerHTML = "Wind: " + data.daily[0].wind_speed + " mph"

        // weather conditions
        let conditions0 = document.createElement("div");
        currentWeatherInfo.appendChild(conditions0);
        conditions0.innerHTML = "Current conditions: " + data.current.weather[0].description;

        // weather icon
        let spanIcon = document.createElement("span");
        let weatherIcon = document.createElement("img");
        spanIcon.appendChild(weatherIcon)
        currentWeatherInfo.appendChild(spanIcon);
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.current.weather[0].icon + "@2x.png"



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
        newDate1.style.fontWeight = "bold";
        newDate1.style.color = "black"
        newDate1.style.backgroundColor = "lightgray"
        newDate1.style.borderRadius = "2px"
        newDate1.style.marginTop = "5px"

        // max temp
        let maxTemp1 = document.createElement("div");
        dayOneContainer.appendChild(maxTemp1);
        maxTemp1.innerHTML = "High temp: " + data.daily[1].temp.max + " °F";

        // min temp
        let minTemp1 = document.createElement("div");
        dayOneContainer.append(minTemp1);
        minTemp1.innerHTML = "Low temp: " + data.daily[1].temp.min + " °F";

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
        conditions1.innerHTML = "Conditions: " + data.daily[0].weather[0].description;

        // weather icon
        let spanIcon = document.createElement("span");
        let weatherIcon = document.createElement("img");
        spanIcon.appendChild(weatherIcon)
        dayOneContainer.appendChild(spanIcon);
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.daily[0].weather[0].icon + "@2x.png"

      };

      let dayTwo = () => {
        // DAY TWO INFO
        let dayTwoContainer = document.querySelector(".day2");
        dayTwoContainer.innerHTML = "";

        // date 
        let newDate2 = document.createElement("div");
        dayTwoContainer.appendChild(newDate2);
        d.setDate(d.getDate() + 1)
        newDate2.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear()

        newDate2.style.fontWeight = "bold";
        newDate2.style.color = "black"
        newDate2.style.backgroundColor = "lightgray"
        newDate2.style.borderRadius = "2px"
        newDate2.style.marginTop = "5px"


        // max temp
        let maxTemp2 = document.createElement("div");
        dayTwoContainer.appendChild(maxTemp2);
        maxTemp2.innerHTML = "High temp: " + data.daily[2].temp.max + " °F";

        // min temp
        let minTemp2 = document.createElement("div");
        dayTwoContainer.append(minTemp2);
        minTemp2.innerHTML = "Low temp: " + data.daily[2].temp.min + " °F";

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
        conditions2.innerHTML = "Conditions: " + data.daily[1].weather[0].description;

        // weather icon
        let spanIcon = document.createElement("span");
        let weatherIcon = document.createElement("img");
        spanIcon.appendChild(weatherIcon)
        dayTwoContainer.appendChild(spanIcon);
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + "@2x.png"

      };

      // DAY THREE
      let dayThree = () => {
        // DAY Three INFO
        let dayThreeContainer = document.querySelector(".day3");
        dayThreeContainer.innerHTML = "";

        // date 
        let newDate3 = document.createElement("div");
        dayThreeContainer.appendChild(newDate3);
        d.setDate(d.getDate() + 1)
        newDate3.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

        newDate3.style.fontWeight = "bold";
        newDate3.style.color = "black"
        newDate3.style.backgroundColor = "lightgray"
        newDate3.style.borderRadius = "2px"
        newDate3.style.marginTop = "5px"

        // max temp
        let maxTemp3 = document.createElement("div");
        dayThreeContainer.appendChild(maxTemp3);
        maxTemp3.innerHTML = "High temp: " + data.daily[3].temp.max + " °F";

        // min temp
        let minTemp3 = document.createElement("div");
        dayThreeContainer.append(minTemp3);
        minTemp3.innerHTML = "Low temp: " + data.daily[3].temp.min + " °F";

        // humidity 
        let humidity3 = document.createElement("div");
        dayThreeContainer.appendChild(humidity3);
        humidity3.innerHTML = "Humidity: " + data.daily[3].humidity + "%";

        // wind speed
        let wind3 = document.createElement("div");
        dayThreeContainer.appendChild(wind3);
        wind3.innerHTML = "Wind: " + data.daily[3].wind_speed + " mph"

        // weather conditions
        let conditions3 = document.createElement("div");
        dayThreeContainer.appendChild(conditions3);
        conditions3.innerHTML = "Conditions: " + data.daily[2].weather[0].description;

        // weather icon
        let spanIcon = document.createElement("span");
        let weatherIcon = document.createElement("img");
        spanIcon.appendChild(weatherIcon)
        dayThreeContainer.appendChild(spanIcon);
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + "@2x.png"

      };

      // DAY FOUR
      let dayFour = () => {
        // DAY Four INFO
        let dayFourContainer = document.querySelector(".day4");
        dayFourContainer.innerHTML = "";

        // date 
        let newDate4 = document.createElement("div");
        dayFourContainer.appendChild(newDate4);
        d.setDate(d.getDate() + 1)
        newDate4.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

        newDate4.style.fontWeight = "bold";
        newDate4.style.color = "black"
        newDate4.style.backgroundColor = "lightgray"
        newDate4.style.borderRadius = "2px"
        newDate4.style.marginTop = "5px"

        // max temp
        let maxTemp4 = document.createElement("div");
        dayFourContainer.appendChild(maxTemp4);
        maxTemp4.innerHTML = "High temp: " + data.daily[4].temp.max + " °F";

        // min temp
        let minTemp4 = document.createElement("div");
        dayFourContainer.append(minTemp4);
        minTemp4.innerHTML = "Low temp: " + data.daily[4].temp.min + " °F";

        // humidity 
        let humidity4 = document.createElement("div");
        dayFourContainer.appendChild(humidity4);
        humidity4.innerHTML = "Humidity: " + data.daily[4].humidity + "%";

        // wind speed
        let wind4 = document.createElement("div");
        dayFourContainer.appendChild(wind4);
        wind4.innerHTML = "Wind: " + data.daily[4].wind_speed + " mph"

        // weather conditions
        let conditions4 = document.createElement("div");
        dayFourContainer.appendChild(conditions4);
        conditions4.innerHTML = "Conditions: " + data.daily[3].weather[0].description;

        // weather icon
        let spanIcon = document.createElement("span");
        let weatherIcon = document.createElement("img");
        spanIcon.appendChild(weatherIcon)
        dayFourContainer.appendChild(spanIcon);
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + "@2x.png"

      };

      // DAY FIVE
      let dayFive = () => {
        // DAY Five INFO
        let dayFiveContainer = document.querySelector(".day5");
        dayFiveContainer.innerHTML = "";

        // date 
        let newDate5 = document.createElement("div");
        dayFiveContainer.appendChild(newDate5);
        d.setDate(d.getDate() + 1)
        newDate5.innerHTML = d.getMonth() + "/" + d.getDate() + "/" + d.getFullYear();

        newDate5.style.fontWeight = "bold";
        newDate5.style.color = "black"
        newDate5.style.backgroundColor = "lightgray"
        newDate5.style.borderRadius = "2px"
        newDate5.style.marginTop = "5px"

        // max temp
        let maxTemp5 = document.createElement("div");
        dayFiveContainer.appendChild(maxTemp5);
        maxTemp5.innerHTML = "High temp: " + data.daily[5].temp.max + " °F"

        // min temp
        let minTemp5 = document.createElement("div");
        dayFiveContainer.append(minTemp5);
        minTemp5.innerHTML = "Low temp: " + data.daily[5].temp.min + " °F";

        // humidity 
        let humidity5 = document.createElement("div");
        dayFiveContainer.appendChild(humidity5);
        humidity5.innerHTML = "Humidity: " + data.daily[5].humidity + "%";

        // wind speed
        let wind5 = document.createElement("div");
        dayFiveContainer.appendChild(wind5);
        wind5.innerHTML = "Wind: " + data.daily[5].wind_speed + " mph"

        // weather conditions
        let conditions5 = document.createElement("div");
        dayFiveContainer.appendChild(conditions5);
        conditions5.innerHTML = "Conditions: " + data.daily[4].weather[0].description;

        // weather icon
        let spanIcon = document.createElement("span");
        let weatherIcon = document.createElement("img");
        spanIcon.appendChild(weatherIcon)
        dayFiveContainer.appendChild(spanIcon);
        weatherIcon.src = "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + "@2x.png"

      };


      currentWeather();
      dayOne();
      dayTwo();
      dayThree();
      dayFour();
      dayFive();

    })
  })
};
