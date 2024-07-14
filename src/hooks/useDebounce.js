import { useCallback, useRef, useEffect } from 'react';

export function useDebounce(callback, delay, options = {}) {
  const { leading = false } = options;
  const timerRef = useRef(null);
  const leadingCallRef = useRef(false);

  const debouncedFunction = useCallback((...args) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    if (leading && !leadingCallRef.current) {
      callback(...args);
      leadingCallRef.current = true;
    }

    timerRef.current = setTimeout(() => {
      if (!leading) {
        callback(...args);
      }
      leadingCallRef.current = false;
    }, delay);
  }, [callback, delay, leading]);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    leadingCallRef.current = false;
  }, [callback, delay, leading]);

  return debouncedFunction;
}