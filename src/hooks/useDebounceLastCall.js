import { useState } from 'react';

export function useDebounceLastCall(func, ms) {
  const [delayed, setDelayed] = useState(null);

  return function () {
    if (delayed) {
      console.log('waiting');
      clearTimeout(delayed);
    }
    const timeout = setTimeout(() => {
      console.log('debounce execute');
      func.apply(this, arguments);
      setDelayed(null);
    }, ms);
    setDelayed(timeout);
  };
}
