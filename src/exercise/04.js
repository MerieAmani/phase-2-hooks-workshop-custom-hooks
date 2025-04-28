import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue = null) {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    function handleStorage(event) {
      if (event.key === key) {
        setState(event.newValue ? JSON.parse(event.newValue) : initialValue); // ✅ Parse newValue
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("storage", handleStorage); // ✅ Cleanup
    };
  }, [key, initialValue]);

  return [state, setState];
}
