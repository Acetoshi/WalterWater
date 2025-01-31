import { ChangeEvent, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDebounce } from '@/utilities/useDebounce';
import './SearchBar.css';
import UserMarker from '@/components/map_components/UserMarker/UserMarker';
import SearchMarker from '@/components/map_components/SearchMarker/SearchMarker';
import { LatLng } from '@/Contexts/contexts.types';

export default function SearchBar() {
  const [search, setSearch] = useState<string>('');
  const [results, setResults] = useState({ entries: [], displayed: false });
  const [selectedResultLatLng, setSelectedResultLatLng] = useState<LatLng>({
    lat: 0,
    lng: 0,
  });
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

  // TODO : this is tricky cause you can't use a keyboard to see serch results, maybe trigger it with the div ?
  const handleInputBlur = () => {
    console.log('blurred');
    const newResults = { ...results, displayed: false };
    setTimeout(() => setResults(newResults), 150);
  };

  return (
    <div
      id="searchbar-container"
      onBlur={handleInputBlur}
      onFocus={handleInputFocus}
    >
      <label id="searchbar-label" htmlFor="searchbar-input">
        <input
          id="searchbar-input"
          value={search}
          type="text"
          onChange={handleChange}
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
                setSelectedResultLatLng({lat:r.lat,lng:r.lon})
                handleFlyTo(r.lat, r.lon);
              }}
            >
              {r.display_name}
            </button>
          </li>
        ))}
      </ul>
      <SearchMarker latLng={selectedResultLatLng} />
    </div>
  );
}
