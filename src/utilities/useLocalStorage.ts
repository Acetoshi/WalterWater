import { useState } from 'react';

export default function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading localStorage', error);
      return initialValue;
    }
  });

  //TODO figure this out, what's the difference here ? does it impact ts errors i get in position provider ? INVESTIGATE
  // useEffect(() => {
  //   try {
  //     localStorage.setItem(key, JSON.stringify(storedValue));
  //   } catch (error) {
  //     console.error('Error setting localStorage', error);
  //   }
  // }, [key, storedValue]);

  const setValue = (value: T | ((prev: T) => T)) => {
    try {
      const valueToStore = typeof value === 'function' ? (value as (prev: T) => T)(storedValue) : value;
      setStoredValue(valueToStore);
      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('Error setting localStorage', error);
    }
  };

  return [storedValue, setValue];
}
