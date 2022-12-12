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

function showFahrenheitTemp(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);

citySearch("Riga");
