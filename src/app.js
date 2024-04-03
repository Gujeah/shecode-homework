let searchForm = document.querySelector("#search-form");
console.log(searchForm);

function handleSearch(event) {
  event.preventDefault();
  let searchinput = document.querySelector("#search");
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = searchinput.value;
}
searchForm.addEventListener("submit", handleSearch);
