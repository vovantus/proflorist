export function useDelay(func, ms) {
  return function () {
    setTimeout(() => {
      console.log('function delayed');
      func.apply(this, arguments);
    }, ms);
  };
}
