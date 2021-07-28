function fetchForecastForCity(cityName = 'Cherkasy') {
  return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=e335f94b4f09c88c14240e7f6d84c61c`)
    .then(response => {
      if (response.status == 200) {
        return response.json();
      } else {
        throw new Error(`Something get wrong with status ${response.status}.`);
      }
    });
}

function consoleForecastForCity(forecastData) {
  const {city: {name, country}, list} = forecastData;
  const headingForecastString = `5 days forecast for ${name}, ${country}:\n`;

  const resultText = list.reduce((acc, listItem) => {
    const {dt_txt, main: {temp, humidity}, weather: [{description: weatherDescription}], wind: {speed}} = listItem;

    return acc + `Date: ${dt_txt}, temperature: ${temp}℃, humidity: ${humidity}%, weather: ${weatherDescription}, wind: ${speed} m/s.\n`;
  }, headingForecastString);
  
  console.log(resultText);
}

fetchForecastForCity().then((data) => consoleForecastForCity(data));
fetchForecastForCity('Kremenchuk').then((data) => consoleForecastForCity(data));