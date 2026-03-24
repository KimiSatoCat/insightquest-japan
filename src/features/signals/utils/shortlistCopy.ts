function buildLabel<T>(
  item: T,
  index: number,
  resolveLabel: (item: T, index: number) => string,
): string {
  return resolveLabel(item, index) || `Selected stay ${index + 1}`;
}

function buildAbsoluteHref(href: string | null, origin: string): string | null {
  if (!href) return null;
  if (!origin) return null;
  return `${origin}${href}`;
}

export function buildShortlistPlainText<T>(
  items: T[],
  resolveLabel: (item: T, index: number) => string,
): string {
  return items
    .map((item, index) => `${index + 1}. ${buildLabel(item, index, resolveLabel)}`)
    .filter(Boolean)
    .join("\n");
}

export function buildShortlistLinkText<T>(
  items: T[],
  resolveLabel: (item: T, index: number) => string,
  resolveHref: (item: T) => string | null,
  origin: string,
): string {
  return items
    .map((item, index) => {
      const label = buildLabel(item, index, resolveLabel);
      const absoluteHref = buildAbsoluteHref(resolveHref(item), origin);
      return absoluteHref ? `${index + 1}. ${label} — ${absoluteHref}` : `${index + 1}. ${label}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function buildShortlistMarkdownText<T>(
  items: T[],
  resolveLabel: (item: T, index: number) => string,
  resolveHref: (item: T) => string | null,
  origin: string,
): string {
  return items
    .map((item, index) => {
      const label = buildLabel(item, index, resolveLabel);
      const absoluteHref = buildAbsoluteHref(resolveHref(item), origin);
      return absoluteHref ? `${index + 1}. [${label}](${absoluteHref})` : `${index + 1}. ${label}`;
    })
    .filter(Boolean)
    .join("\n");
}
