import { ChangeEvent, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDebounce } from '@/utilities/useDebounce';
import './SearchBar.css';
import UserMarker from '@/components/map_components/UserMarker/UserMarker';

export default function SearchBar() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState({ entries: [], displayed: false });
  const debouncedSearch = useDebounce<string>(search, 500);
  const map = useMap();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${sanitisedSearch}&format=jsonv2`,
      );
      const result = await response.json();
      setResults({ entries: result, displayed: true });
    };

    const sanitisedSearch = debouncedSearch.trim();
    if (sanitisedSearch) {
      fetchResults();
    }
  }, [debouncedSearch]);

  const handleFlyTo = (lat: number, lng: number) => {
    map.closePopup();
    map.flyTo({ lat, lng }, 15, { duration: 1 });
  };

  const handleInputFocus = () => {
    const newResults = { ...results, displayed: true };
    setResults(newResults);
  };

  const handleInputBlur = () => {
    const newResults = { ...results, displayed: false };
    setTimeout(()=>setResults(newResults),300);
  };
  console.log(results)

  return (
    <div id="searchbar-container">
      <label id="searchbar-label" htmlFor="searchbar-input">
        <input
          id="searchbar-input"
          value={search}
          type="text"
          onChange={handleChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
        />
      </label>
      <ul
        id="searchbar-results"
        className={results.displayed ? 'visible' : 'hidden'}
      >
        {results.entries.map((r) => (
          <li key={r.place_id}>
            <button
              onClick={() => {
                console.log('clicked');
                handleFlyTo(r.lat, r.lon);
              }}
            >
              {r.display_name}
            </button>
          </li>
        ))}
      </ul>
      
    </div>
  );
}
