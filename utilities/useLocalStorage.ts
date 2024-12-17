import { useState, useEffect } from "react";

export default function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const isBrowserEnvironment = window //typeof window !== "undefined";

  useEffect(() => {
    // Check if we're in the browser
    if (isBrowserEnvironment) {
      try {
        const item = localStorage.getItem(key);
        if (item) {
          setStoredValue(JSON.parse(item));
        } else {
          setStoredValue(initialValue);
        }
      } catch (error) {
        console.error("Error reading localStorage", error);
      }
    }
  }, []);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (isBrowserEnvironment) {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error("Error setting localStorage", error);
    }
  };

  return [storedValue, setValue];
}
