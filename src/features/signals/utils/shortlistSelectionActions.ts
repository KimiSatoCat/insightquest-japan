function dedupeByKey<T>(items: T[], getKey: (item: T) => string): T[] {
  return items.filter((item, index, array) => {
    const key = getKey(item);
    if (!key) return true;
    return array.findIndex((candidate) => getKey(candidate) === key) === index;
  });
}

export function moveSelectionItem<T>(
  items: T[],
  getKey: (item: T) => string,
  target: T,
  direction: -1 | 1,
): T[] {
  const targetKey = getKey(target);
  if (!targetKey) return items;

  const currentIndex = items.findIndex((item) => getKey(item) === targetKey);
  if (currentIndex < 0) return items;

  const nextIndex = currentIndex + direction;
  if (nextIndex < 0 || nextIndex >= items.length) return items;

  const next = [...items];
  const [moved] = next.splice(currentIndex, 1);
  next.splice(nextIndex, 0, moved);
  return next;
}

export function removeSelectionItem<T>(
  items: T[],
  getKey: (item: T) => string,
  target: T,
): T[] {
  const targetKey = getKey(target);
  if (!targetKey) return items;
  return items.filter((item) => getKey(item) !== targetKey);
}

export function restoreRemovedSelectionItem<T>(
  items: T[],
  removed: T,
  getKey: (item: T) => string,
): T[] {
  const removedKey = getKey(removed);
  if (!removedKey) return items;
  if (items.some((item) => getKey(item) === removedKey)) return items;
  return [...items, removed];
}

export function restoreClearedSelectionItems<T>(
  cleared: T[],
  current: T[],
  getKey: (item: T) => string,
): T[] {
  return dedupeByKey([...cleared, ...current], getKey);
}

export function keepTopSelectionItems<T>(items: T[], maxCount: number): T[] {
  if (maxCount < 1) return items;
  if (items.length <= maxCount) return items;
  return items.slice(0, maxCount);
}
