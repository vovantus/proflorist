export function useDebounce(func, ms) {
  return function () {
    setTimeout(() => {
      console.log('debounce');
      func.apply(this, arguments);
    }, ms);
  };
}
