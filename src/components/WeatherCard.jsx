export default function WeatherCard({ weather, place }) {
  const conditions = weather.weather[0];
  const description = conditions.description;
  const iconName = conditions.icon || '01d';

  return (
    <section className="weather-card" aria-label="Current weather">
      <div className="weather-top">
        <div>
          <h2>{place.name}, {place.country}</h2>
          <p className="description">{description}</p>
        </div>
        <img
          src={`/images/${iconName}.png`}
          alt={description}
          width="110"
          height="110"
        />
      </div>

      <p className="temperature">{Math.round(weather.main.temp)}°C</p>
      <p className="small-text">Current temperature</p>

      <div className="details">
        <div className="detail">
          <p>Feels like</p>
          <strong>{Math.round(weather.main.feels_like)}°C</strong>
        </div>
        <div className="detail">
          <p>Humidity</p>
          <strong>{weather.main.humidity}%</strong>
        </div>
        <div className="detail">
          <p>Wind speed</p>
          <strong>{weather.wind?.speed ?? '—'} m/s</strong>
        </div>
      </div>
    </section>
  );
}
