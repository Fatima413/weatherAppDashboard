export default function LocationSelect({ locations, selectedIndex, onSelect, disabled }) {
  return (
    <section className="location-box">
      <label htmlFor="locationSelect">Location</label>
      <select
        id="locationSelect"
        value={selectedIndex}
        onChange={(event) => onSelect(event.target.value)}
        disabled={disabled}
      >
        <option value="">Select a location</option>
        {locations.map((place, index) => (
          <option key={`${place.lat}-${place.lon}-${index}`} value={String(index)}>
            {[place.name, place.state, place.country].filter(Boolean).join(', ')}
          </option>
        ))}
      </select>
    </section>
  );
}
