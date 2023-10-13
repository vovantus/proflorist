import { useState } from 'react';

export function useDebounce(func, ms) {
  const [cooldown, setCoolDown] = useState(false);

  return function () {
    if (cooldown) {
      console.log('debounce skip');
      return;
    }
    console.log('debounce execute');
    func.apply(this, arguments);
    setCoolDown(true);
    setTimeout(() => {
      console.log('debounce ready');
      setCoolDown(false);
    }, ms);
  };
}
