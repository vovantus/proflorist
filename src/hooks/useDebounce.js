import { useCallback } from 'react';
export function useDebounce(func, ms) {
  const freezedFunction = useCallback(
    () =>
      setTimeout(() => {
        console.log('debounce');
        func.apply(arguments);
      }, ms),
    [],
  );
  return freezedFunction;
}
