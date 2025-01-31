import { useDebounce } from '@/utilities/useDebounce';
import { useEffect, useRef, useState } from 'react';

export default function SearchBar() {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce<string>(search, 500);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const sanitisedSearch = debouncedSearch.trim();
    if (sanitisedSearch) {
      // call the API
      console.log(sanitisedSearch);
    }
  }, [debouncedSearch]);

  return (
    <div className="searchbar-container">
      <input value={search} type="text" onChange={handleChange}></input>
    </div>
  );
}
