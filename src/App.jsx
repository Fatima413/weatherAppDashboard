import { useEffect, useState } from 'react';
import Header from './components/Header.jsx';
import SearchBar from './components/SearchBar.jsx';
import LocationSelect from './components/LocationSelect.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import LoadingSpinner from './components/LoadingSpinner.jsx';
import ErrorMessage from './components/ErrorMessage.jsx';
import { findLocations, getCurrentWeather } from './services/weatherApi.js';

export default function App() {
  // Shared state lives in App because several children need it.
  const [query, setQuery] = useState('');
  const [searchRequest, setSearchRequest] = useState(null);
  const [locations, setLocations] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState('');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [weather, setWeather] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function handleSearch() {
    const city = query.trim();
    if (!city) {
      setSearchRequest(null);
      setLocations([]);
      setSelectedIndex('');
      setSelectedPlace(null);
      setWeather(null);
      setError('Please enter a city name.');
      setStatus('error');
      return;
    }

    setLocations([]);
    setSelectedIndex('');
    setSelectedPlace(null);
    setWeather(null);
    setError('');
    setStatus('searching');
    // A new object allows searching the same city again.
    setSearchRequest({ city });
  }

  function handleLocationSelect(index) {
    setSelectedIndex(index);
    setWeather(null);
    setError('');
    if (index === '') {
      setSelectedPlace(null);
      setStatus('choose');
      return;
    }
    setStatus('loading');
    setSelectedPlace(locations[Number(index)]);
  }

  // Effect 1: find locations after the user submits a search.
  useEffect(() => {
    if (!searchRequest) return;
    const controller = new AbortController();

    async function loadLocations() {
      try {
        const results = await findLocations(searchRequest.city, controller.signal);
        if (controller.signal.aborted) return;
        setLocations(results);
        setStatus('choose');
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.message || 'Could not find locations.');
        setStatus('error');
      }
    }

    loadLocations();
    return () => controller.abort();
  }, [searchRequest]);

  // Effect 2: fetch new weather whenever the selected location changes.
  useEffect(() => {
    if (!selectedPlace) return;
    const controller = new AbortController();

    async function loadWeather() {
      try {
        const result = await getCurrentWeather(selectedPlace, controller.signal);
        if (controller.signal.aborted) return;
        setWeather(result);
        setStatus('success');
      } catch (err) {
        if (controller.signal.aborted) return;
        setError(err.message || 'Could not load weather.');
        setStatus('error');
      }
    }

    loadWeather();
    return () => controller.abort();
  }, [selectedPlace]);

  return (
    <main className="container">
      <Header />
      <SearchBar
        query={query}
        onQueryChange={setQuery}
        onSearch={handleSearch}
        disabled={status === 'searching'}
      />

      {status === 'idle' && (
        <p className="status-message">Enter a city to see its weather.</p>
      )}
      {status === 'searching' && <LoadingSpinner message="Searching for matching cities..." />}
      {status === 'choose' && (
        <p className="status-message">Choose the correct city from the list.</p>
      )}
      {status === 'loading' && <LoadingSpinner message="Loading weather..." />}
      {status === 'error' && <ErrorMessage message={error} />}

      {locations.length > 0 && status !== 'searching' && (
        <LocationSelect
          locations={locations}
          selectedIndex={selectedIndex}
          onSelect={handleLocationSelect}
          disabled={status === 'loading'}
        />
      )}

      {status === 'success' && weather && selectedPlace && (
        <WeatherCard weather={weather} place={selectedPlace} />
      )}

      <footer>Weather data from OpenWeather</footer>
    </main>
  );
}
