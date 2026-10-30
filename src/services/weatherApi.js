// The OpenWeather browser API key is configured in .env.local (not committed).
// VITE_ environment values are visible in the browser; don't use a secret key here.
const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

function checkApiKey() {
  if (!API_KEY || API_KEY === 'replace_with_your_api_key') {
    throw new Error('Please add your OpenWeather API key to .env.local, then restart Vite.');
  }
}

async function readJson(url, signal) {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    if (response.status === 401 || response.status === 403) {
      throw new Error('The API key is invalid or has not been activated yet.');
    }
    if (response.status === 429) {
      throw new Error('Too many requests. Please try again later.');
    }
    if (response.status === 404) {
      throw new Error('The requested city or weather was not found.');
    }
    throw new Error('Could not load weather data. Please try again.');
  }

  return response.json();
}

export async function findLocations(city, signal) {
  checkApiKey();
  const params = new URLSearchParams({ q: city, limit: '5', appid: API_KEY });
  const locations = await readJson(`${BASE_URL}/geo/1.0/direct?${params}`, signal);
  if (!Array.isArray(locations) || locations.length === 0) {
    throw new Error('No matching city found. Check the name and try again.');
  }
  return locations;
}

export async function getCurrentWeather(place, signal) {
  checkApiKey();
  const params = new URLSearchParams({
    lat: String(place.lat),
    lon: String(place.lon),
    appid: API_KEY,
    units: 'metric',
  });
  const weather = await readJson(`${BASE_URL}/data/2.5/weather?${params}`, signal);
  if (!weather.main || !Array.isArray(weather.weather) || !weather.weather[0]) {
    throw new Error('The weather service returned incomplete data.');
  }
  return weather;
}
