type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord | null {
  return typeof value === "object" && value != null ? (value as UnknownRecord) : null;
}

function toStringValue(value: unknown): string {
  return value == null ? "" : String(value);
}

function getFallbackValues(record: UnknownRecord): string[] {
  return [
    record.slug,
    record.id,
    record.key,
    record.staySlug,
    record.value,
    record.name,
    record.title,
  ]
    .filter((value) => value != null)
    .map((value) => String(value));
}

function findMatchingPoolEntry(item: unknown, pools: Array<Array<unknown>>): unknown | null {
  const targetKey = getShortlistSelectionKey(item);
  if (!targetKey) return null;

  for (const pool of pools) {
    const match = pool.find((entry) => {
      const entryKey = getShortlistSelectionKey(entry);
      if (entryKey && entryKey === targetKey) {
        return true;
      }

      const record = asRecord(entry);
      if (!record) return false;

      return getFallbackValues(record).includes(targetKey);
    });

    if (match) return match;
  }

  return null;
}

export function getShortlistSelectionKey(item: unknown): string {
  if (item == null) return "";
  if (typeof item === "string" || typeof item === "number") return String(item);

  const record = asRecord(item);
  if (!record) return "";

  return toStringValue(record.slug ?? record.id ?? record.key ?? record.staySlug ?? record.value ?? record.name ?? record.title ?? "");
}

export function getShortlistSelectionLabel(item: unknown): string {
  if (item == null) return "";
  if (typeof item === "string" || typeof item === "number") return String(item);

  const record = asRecord(item);
  if (!record) return "";

  return toStringValue(record.name ?? record.title ?? record.slug ?? record.id ?? record.key ?? record.staySlug ?? record.value ?? "");
}

export function resolveShortlistDisplayLabel(item: unknown, pools: Array<Array<unknown>>): string {
  const directLabel = getShortlistSelectionLabel(item);
  const match = findMatchingPoolEntry(item, pools);
  return match ? getShortlistSelectionLabel(match) || directLabel : directLabel;
}

export function resolveShortlistHref(item: unknown, pools: Array<Array<unknown>>): string | null {
  const directRecord = asRecord(item);
  const directSlug = directRecord ? toStringValue(directRecord.slug ?? directRecord.staySlug ?? "") : "";
  if (directSlug) {
    return `/signals/${encodeURIComponent(directSlug)}`;
  }

  const match = findMatchingPoolEntry(item, pools);
  const record = asRecord(match);
  if (!record) return null;

  const resolvedSlug = toStringValue(record.slug ?? record.staySlug ?? "");
  return resolvedSlug ? `/signals/${encodeURIComponent(resolvedSlug)}` : null;
}
