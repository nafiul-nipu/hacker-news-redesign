import { useState } from "react";

// Keep React state in sync with localStorage
// so user preferences survive refreshes.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    // use the default value if nothing is saved
    if (!savedValue) {
      return initialValue;
    }

    try {
      return JSON.parse(savedValue) as T;
    } catch {
      // use default value if saved data is invalid
      return initialValue;
    }
  });

  function setValue(value: T | ((currentValue: T) => T)) {
    setStoredValue((currentValue) => {
      const nextValue = value instanceof Function ? value(currentValue) : value;

      // save updated value to localstorage
      localStorage.setItem(key, JSON.stringify(nextValue));

      return nextValue;
    });
  }

  return [storedValue, setValue] as const;
}
