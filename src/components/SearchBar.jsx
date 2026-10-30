export default function SearchBar({ query, onQueryChange, onSearch, disabled }) {
  function handleSubmit(event) {
    event.preventDefault();
    onSearch();
  }

  return (
    <section className="search-box">
      <form onSubmit={handleSubmit}>
        <label htmlFor="cityInput">City</label>
        <div className="search-row">
          <input
            id="cityInput"
            type="text"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Enter a city"
            autoComplete="off"
            aria-label="City name"
          />
          <button type="submit" disabled={disabled}>
            {disabled ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>
    </section>
  );
}
