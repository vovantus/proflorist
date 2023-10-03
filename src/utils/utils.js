export function getMinMaxBouquetPrices(bouquets) {
  if (bouquets.length > 0) {
    return bouquets.reduce(
      (acc, bouquet) => [
        Math.min(acc[0], bouquet.Price),
        Math.max(acc[1], bouquet.Price),
      ],
      [Infinity, -Infinity],
    );
  } else {
    return [0, 0];
  }
}

export function toggleSortDirection(direction) {
  return direction === 'asc' ? 'desc' : 'asc';
}

export function compareBouquets(a, b, field, direction) {
  const comparison = a[field] > b[field] ? 1 : -1;
  return direction === 'asc' ? comparison : -comparison;
}
