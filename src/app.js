function showDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayNumber = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[dayNumber];
  return `${day} ${hours}:${minutes}`;
}

function showForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  let forecastDays = ["Thu", "Fri", "Sat", "Sun", "Mon"];
  forecastDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">      
  <div class="weather-forecast-date">${day}</div>
 <img class="forecast-icon"
                src="http://openweathermap.org/img/wn/04n@2x.png"
                width="70px"
              />
              <div class="weather-forecast-temperature">
                <span class="weather-forecast-temp-max"> 12° </span>
                <span class="weather-forecast-temp-min"> 3°</span>
              </div>
            </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
}

function showWeather(response) {
  document.querySelector("#h1").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;

  document.querySelector("#wind-speed").innerHTML =
    "Wind speed: " + Math.round(response.data.wind.speed) + " km/h";

  document.querySelector("#humidity").innerHTML =
    "Humidity: " + Math.round(response.data.main.humidity) + "%";
  document.querySelector("#date-time").innerHTML = showDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#main-icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );

  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
}

function citySearch(city) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  citySearch(city);
}
let searchForm = document.querySelector("#search-bar");
searchForm.addEventListener("submit", handleSubmit);

function getLocation(position) {
  let apiKey = "6a48a550fc04f170639e60d52b8a6bc5";
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showWeather);
}

function currentGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getLocation);
}

let geoLocationButton = document.querySelector("#weather-refresh");
geoLocationButton.addEventListener("click", currentGeoLocation);

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsiusTemp(event) {
  event.preventDefault();
  document.querySelector("#temperature").innerHTML =
    Math.round(celsiusTemperature);
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemp);

citySearch("Riga");
showForecast();
