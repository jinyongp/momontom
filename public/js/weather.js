(() => {
  const weatherSection = document.querySelector('#weather');

  const WEATHER_API_URL = (lat, lon) =>
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`;
  const WEATHER_ICON_URL = (icon) => `http://openweathermap.org/img/wn/${icon}@2x.png`;

  printWeatherSection();

  async function printWeatherSection() {
    const coords = await getCurrentLocation();
    const { city, main, weather } = await getWeatherByCoordinates(coords);

    const cityName = weatherSection.querySelector('#city-name');
    const detail = weatherSection.querySelector('#weather-detail');
    const icon = weatherSection.querySelector('#icon-image');
    const temperature = weatherSection.querySelector('#temperature');
    const avgTemp = temperature.querySelector('#avg-temp span:last-child');
    const maxTemp = temperature.querySelector('#max-temp span:last-child');
    const minTemp = temperature.querySelector('#min-temp span:last-child');
    const feelTemp = temperature.querySelector('#feel-temp span:last-child');

    cityName.textContent = city;
    detail.textContent = weather.description;
    icon.src = WEATHER_ICON_URL(weather.icon);
    avgTemp.textContent = main.temp;
    maxTemp.textContent = main.temp_max;
    minTemp.textContent = main.temp_min;
    feelTemp.textContent = main.feels_like;
  }

  async function getCurrentLocation() {
    try {
      const {
        coords: { latitude, longitude },
      } = await new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject),
      );
      return { latitude, longitude };
    } catch (error) {
      console.warn(error);
    }
  }

  async function getWeatherByCoordinates({ latitude, longitude }) {
    try {
      const { main, name, weather } = await fetch(WEATHER_API_URL(latitude, longitude)).then(
        (res) => res.json(),
      );
      return { city: name, main, weather: weather[0] };
    } catch (error) {
      console.warn(error);
    }
  }
})();
