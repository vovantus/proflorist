export default function Loading({ loaderState }) {
  let text =
    loaderState === 'error'
      ? 'Error while loading. Try again later.'
      : 'Loading...';

  return <h2>{text}</h2>;
}
