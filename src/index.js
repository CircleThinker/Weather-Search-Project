let today = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[today.getDay()];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[today.getMonth()];
let date = today.getDate();

let hour = today.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let mins = today.getMinutes();
if (mins < 10) {
  mins = `0${mins}`;
}
let todaysDate = document.querySelector("#time-and-date");
function currentDate() {
  todaysDate.innerHTML = `${day} ${date} ${month}, ${hour}:${mins}`;
}
currentDate();

function displayTemp(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let high = Math.round(response.data.main.temp_max);
  let low = Math.round(response.data.main.temp_min);
  let feel = Math.round(response.data.main.feels_like);

  let winds = Math.round(response.data.wind.speed * 3.6);

  celsiusTemperature = response.data.main.temp;
  celsiusHigh = response.data.main.temp_max;
  celsiusLow = response.data.main.temp_min;
  celsiusReal = response.data.main.feels_like;
  mpsWindspeed = response.data.wind.speed;

  let currentTemp = document.querySelector("#current");
  currentTemp.innerHTML = `${temperature}°C `;
  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = `${high}°C `;
  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = `${low}°C `;
  let feelsLike = document.querySelector("#feel");
  feelsLike.innerHTML = `${feel}°C`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${winds}kph`;
  let newDescription = document.querySelector("#description");
  newDescription.innerHTML = `${response.data.weather[0].description}`;
  let humidity = document.querySelector("#rain");
  humidity.innerHTML = `${response.data.main.humidity}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

let form = document.querySelector("#search-form");

function updateCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-search");
  let displayCity = document.querySelector("#start-city");
  displayCity.innerHTML = searchInput.value;
  let apiKey = "21184456aa108677df374849eedba29f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayTemp);
}

form.addEventListener("submit", updateCity);

function displayFarenheitTemp(event) {
  event.preventDefault();
  let farenheitTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
  let farenheitHigh = Math.round((celsiusHigh * 9) / 5 + 32);
  let farenheitLow = Math.round((celsiusLow * 9) / 5 + 32);
  let farenheitReal = Math.round((celsiusReal * 9) / 5 + 32);
  let mphWindspeed = Math.round(mpsWindspeed * 2.237);
  let currentTemp = document.querySelector("#current");
  currentTemp.innerHTML = `${farenheitTemp}°F `;
  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = `${farenheitHigh}°F `;
  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = `${farenheitLow}°F `;
  let feelsLike = document.querySelector("#feel");
  feelsLike.innerHTML = `${farenheitReal}°F`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${mphWindspeed}mph`;
}

function displayCelsiusTemp(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#current");
  currentTemp.innerHTML = `${Math.round(celsiusTemperature)}°C`;
  let highTemp = document.querySelector("#high");
  highTemp.innerHTML = `${Math.round(celsiusHigh)}°C `;
  let lowTemp = document.querySelector("#low");
  lowTemp.innerHTML = `${Math.round(celsiusLow)}°C `;
  let feelsLike = document.querySelector("#feel");
  feelsLike.innerHTML = `${Math.round(celsiusReal)}°C`;
  let windSpeed = document.querySelector("#wind");
  windSpeed.innerHTML = `${Math.round(mpsWindspeed * 3.6)}kph`;
}

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", displayFarenheitTemp);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemp);
let celsiusTemperature = null;
let celsiusHigh = null;
let celsiusLow = null;
let celsiusReal = null;
let mpsWindspeed = null;
