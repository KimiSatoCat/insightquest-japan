export const BOOKMARK_STORAGE_KEY = "stay_signals_bookmarks";
export const BOOKMARKS_EVENT = "stay-signals-bookmarks-changed";

export function readBookmarks(): string[] {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(BOOKMARK_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return [...new Set(parsed.filter((item) => typeof item === "string"))];
  } catch {
    return [];
  }
}

export function writeBookmarks(slugs: string[]): void {
  if (typeof window === "undefined") {
    return;
  }

  const normalized = [...new Set(slugs.map((slug) => slug.trim()).filter(Boolean))];
  window.localStorage.setItem(BOOKMARK_STORAGE_KEY, JSON.stringify(normalized));
  emitBookmarksChanged();
}

export function toggleBookmark(slug: string): string[] {
  const current = readBookmarks();
  if (current.includes(slug)) {
    const next = current.filter((item) => item !== slug);
    writeBookmarks(next);
    return next;
  }

  const next = [...current, slug];
  writeBookmarks(next);
  return next;
}

export function removeBookmark(slug: string): string[] {
  const next = readBookmarks().filter((item) => item !== slug);
  writeBookmarks(next);
  return next;
}

export function clearBookmarks(): void {
  writeBookmarks([]);
}

export function emitBookmarksChanged(): void {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(BOOKMARKS_EVENT));
}