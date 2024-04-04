function refreshweather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  //   console.log(response.data.temperature.current);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;
  let humidityElement = document.querySelector("#humidity");
  //   console.log(response.data.temperature.humidity);
  humidityElement.innerHTML = response.data.temperature.humidity;

  let windElement = document.querySelector("#wind");
  //   console.log(response.data.wind.speed);
  windElement.innerHTML = response.data.wind.speed;
  let timeElement = document.querySelector("#time");
  console.log(response.data.time);
  let date = new Date(response.data.time * 1000);
  timeElement.innerHTML = formatDate(date);
  let iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="icon" />`;
  getForecast(response.data.city);
}

function formatDate(date) {
  let hour = date.getHours();
  let minute = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  if (minute < 5) {
    minutes = `0${minute}`;
  }
  let day = days[date.getDay()];
  return `${day}  ${hour}:${minute}`;
}
function searchCity(city) {
  //make API call and update everything
  let apiKey = "cf47e9o04a9a746ea196tf8d38bb1156";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshweather);
}

let searchForm = document.querySelector("#search-form");

function handleSearch(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search");

  searchCity(searchInput.value);
}

function formatDay(timestamp) {
  date = new Date(timestamp * 1000);
  let days = ["sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  return days[date.getDay()];
}

function weatherForecast(response) {
  console.log(response.data);
  //   let days = ["Tue", "Wed", "Thur", "Fri", "Sat"];
  let forecastHtml = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml += `<div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon"> <img src="${
          day.condition.icon_url
        }" class="weather-forecast-icon"/></div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}º</strong>
          </div>
          <div class="weather-forecast-temperature">${Math.round(
            day.temperature.minimum
          )}º</div>
        </div>
      </div>`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

//Creating a function to gett tthe weather forecast on API
function getForecast(city) {
  let apiKey = "cf47e9o04a9a746ea196tf8d38bb1156";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey} `;

  axios.get(apiUrl).then(weatherForecast);
}

searchForm.addEventListener("submit", handleSearch);
searchCity("Lisbon");
