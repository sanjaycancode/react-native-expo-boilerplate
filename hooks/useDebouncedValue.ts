import { useEffect, useState } from "react";

const DEFAULT_DEBOUNCE_DELAY = 300;

export function useDebouncedValue<T>(
  value: T,
  delay = DEFAULT_DEBOUNCE_DELAY,
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [delay, value]);

  return debouncedValue;
}
