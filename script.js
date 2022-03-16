const key = "682500PcukwQUtq1UDd6XimUfAmBA5HL";

// get weather
const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// // get city
const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const detail = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUi = (data) => {
  // const detailCity =data.detailCity;
  // const weather=data.weather

  const { detailCity, weather } = data;

  //update detailes template

  detail.innerHTML = `
    <h5 class="my-3">${detailCity.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
    `;

  // update images and icons

  const iconSrc = `weather_app/img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);

  let timeSrc = null;
  weather.IsDayTime // true or false
    ? (timeSrc = "weather_app/img/day.svg")
    : (timeSrc = "weather_app/img/night.svg");

  time.setAttribute("src", timeSrc);

  // remove the d-none
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const detailCity = await getCity(city);
  const weather = await getWeather(detailCity.Key);

  return { detailCity, weather };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  // update ui with new city
  updateCity(city)
    .then((data) => updateUi(data))
    .catch((err) => console.log(err));
});
