import { useState } from "react";

// Keep React state in sync with localStorage
// so user preferences survive refreshes.
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    const savedValue = localStorage.getItem(key);

    if (!savedValue) {
      return initialValue;
    }

    try {
      return JSON.parse(savedValue) as T;
    } catch {
      return initialValue;
    }
  });

  function setValue(value: T | ((currentValue: T) => T)) {
    setStoredValue((currentValue) => {
      const nextValue = value instanceof Function ? value(currentValue) : value;

      localStorage.setItem(key, JSON.stringify(nextValue));

      return nextValue;
    });
  }

  return [storedValue, setValue] as const;
}
