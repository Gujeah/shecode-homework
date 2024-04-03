function refreshweather(response) {
  let temperatureElement = document.querySelector("#weather-temperature");
  //   console.log(response.data.temperature.current);
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.city;
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
searchForm.addEventListener("submit", handleSearch);
searchCity("Lisbon");
