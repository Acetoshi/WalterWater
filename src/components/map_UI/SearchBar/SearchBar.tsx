import { ChangeEvent, useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import { useDebounce } from '@/utilities/useDebounce';
import SearchMarker from '@/components/map_components/SearchMarker/SearchMarker';
import './SearchBar.css';
import { SearchResults, SelectedResult } from './SearchBar.types';

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<SearchResults>({
    entries: [],
    displayed: false,
  });
  const [selectedResult, setSelectedResult] = useState<SelectedResult>({
    lat: 0,
    lng: 0,
    address: '',
  });

  const debouncedSearchQuery = useDebounce<string>(searchQuery, 500);
  const map = useMap();

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchResults = async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search.php?q=${sanitisedSearchQuery}&format=jsonv2`
      );
      const result = await response.json();
      setSearchResults({ entries: result, displayed: true });
    };

    const sanitisedSearchQuery = debouncedSearchQuery.trim();
    if (sanitisedSearchQuery) {
      fetchResults();
    } else {
      setSearchResults({ entries: [], displayed: true });
    }
  }, [debouncedSearchQuery]);

  const handleFlyTo = (lat: number, lng: number) => {
    map.closePopup();
    map.flyTo({ lat, lng }, 15, { duration: 1 });
  };

  const handleInputFocus = () => {
    const newResults = { ...searchResults, displayed: true };
    setSearchResults(newResults);
  };

  // TODO : this is tricky cause you can't use a keyboard to see serch results, maybe trigger it with the div ?
  const handleInputBlur = () => {
    const newResults = { ...searchResults, displayed: false };
    setTimeout(() => setSearchResults(newResults), 150);
  };

  // This enables us to show a message to the user when his/her search wasn't successfull
  const noResultToShow = debouncedSearchQuery.trim() && searchResults.entries.length === 0;

  return (
    <div id="searchbar-container" onBlur={handleInputBlur} onFocus={handleInputFocus}>
      <label id="searchbar-label" htmlFor="searchbar-input">
        <img alt="" src="/icons/search.svg" />
        <input
          id="searchbar-input"
          value={searchQuery}
          type="text"
          onChange={handleChange}
          placeholder="Search anywhere ..."
        />
      </label>
      <ul
        id="searchbar-results"
        className={searchResults.displayed ? 'visible' : 'hidden'}
        aria-hidden={!searchResults.displayed}
      >
        {searchResults.entries.map((r) => (
          <li key={r.place_id}>
            <button
              onClick={() => {
                setSelectedResult({
                  lat: r.lat,
                  lng: r.lon,
                  address: r.display_name,
                });
                handleFlyTo(r.lat, r.lon);
              }}
            >
              {r.display_name}
            </button>
          </li>
        ))}
        {noResultToShow && <li>No results here. Try rewording your search.</li>}
      </ul>
      {selectedResult.address && (
        <SearchMarker latLng={{ lat: selectedResult.lat, lng: selectedResult.lng }} address={selectedResult.address} />
      )}
    </div>
  );
}
