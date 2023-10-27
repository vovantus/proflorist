export function useDelay(func, ms) {
  return function () {
    setTimeout(() => {
      func.apply(this, arguments);
    }, ms);
  };
}
