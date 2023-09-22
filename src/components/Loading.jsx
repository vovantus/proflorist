export default function Loading({ loaderState }) {
  let text = 'Loading...';

  if (loaderState === 'error') {
    text = 'Error while loading. Try again later.';
  }
  return <h2>{text}</h2>;
}
