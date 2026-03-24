import {
  REGIONS,
  STAY_TYPES,
  type Momentum,
  type Region,
  type StayRecord,
  type StayType,
} from "../types";
import { compareStayPriority, getMomentumLabel, sortStays } from "./momentum";

export interface StayFilters {
  region?: Region;
  stayType?: StayType;
}

export interface DashboardOverview {
  total: number;
  rising: number;
  core: number;
  highTrust: number;
}

export interface DashboardInsights {
  dominantMomentum: {
    key: Momentum | "none";
    label: string;
    count: number;
    summary: string;
  };
  trustWatch: {
    count: number;
    summary: string;
  };
  fitFocus: {
    label: string;
    count: number;
    summary: string;
  } | null;
}

export const SORT_KEYS = ["priority", "recent", "name"] as const;
export type SortKey = (typeof SORT_KEYS)[number];

export const PRESET_KEYS = [
  "luxury",
  "design-led",
  "onsen",
  "family",
  "slow-travel",
] as const;
export type PresetKey = (typeof PRESET_KEYS)[number];

function pickFirst(value: string | string[] | undefined): string | undefined {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
}

export function normalizeRegionParam(
  value: string | string[] | undefined
): Region | undefined {
  const first = pickFirst(value);
  if (!first) return undefined;
  return REGIONS.includes(first as Region) ? (first as Region) : undefined;
}

export function normalizeStayTypeParam(
  value: string | string[] | undefined
): StayType | undefined {
  const first = pickFirst(value);
  if (!first) return undefined;
  return STAY_TYPES.includes(first as StayType)
    ? (first as StayType)
    : undefined;
}

export function normalizeSearchQuery(
  value: string | string[] | undefined
): string | undefined {
  const first = pickFirst(value);
  const normalized = first?.trim() ?? "";
  return normalized.length > 0 ? normalized : undefined;
}

export function normalizeSortParam(
  value: string | string[] | undefined
): SortKey {
  const first = pickFirst(value);
  return SORT_KEYS.includes(first as SortKey) ? (first as SortKey) : "priority";
}

export function normalizePresetParam(
  value: string | string[] | undefined
): PresetKey | undefined {
  const first = pickFirst(value);
  if (!first) return undefined;
  return PRESET_KEYS.includes(first as PresetKey)
    ? (first as PresetKey)
    : undefined;
}

export function normalizeCompareParam(
  value: string | string[] | undefined
): string[] {
  const first = pickFirst(value);
  if (!first) {
    return [];
  }

  return [...new Set(
    first
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean)
  )].slice(0, 4);
}

export function addCompareSlug(
  current: string[],
  slug: string,
  max = 4
): string[] {
  if (current.includes(slug)) {
    return current;
  }

  if (current.length >= max) {
    return current;
  }

  return [...current, slug];
}

export function removeCompareSlug(
  current: string[],
  slug: string
): string[] {
  return current.filter((item) => item !== slug);
}

export function getSortLabel(sort: SortKey): string {
  switch (sort) {
    case "priority":
      return "Priority";
    case "recent":
      return "Most recent";
    case "name":
      return "Name";
    default:
      return "Priority";
  }
}

export function getPresetLabel(preset: PresetKey): string {
  switch (preset) {
    case "luxury":
      return "Luxury";
    case "design-led":
      return "Design-led";
    case "onsen":
      return "Onsen";
    case "family":
      return "Family / Group";
    case "slow-travel":
      return "Slow travel";
    default:
      return preset;
  }
}

export function filterStays(
  records: StayRecord[],
  filters: StayFilters = {}
): StayRecord[] {
  return records.filter((record) => {
    if (filters.region && record.region !== filters.region) {
      return false;
    }

    if (filters.stayType && record.stayType !== filters.stayType) {
      return false;
    }

    return true;
  });
}

export function searchStays(
  records: StayRecord[],
  query?: string
): StayRecord[] {
  const normalized = query?.trim().toLowerCase();
  if (!normalized) {
    return records;
  }

  return records.filter((record) => {
    const haystack = [
      record.name,
      record.city,
      record.region,
      record.stayType,
      record.priceBand,
      record.headline,
      record.summary,
      ...(record.fitTags ?? []),
      ...(record.highlights ?? []),
      ...(record.editorialNotes ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalized);
  });
}

export function filterByPreset(
  records: StayRecord[],
  preset?: PresetKey
): StayRecord[] {
  if (!preset) {
    return records;
  }

  return records.filter((record) => matchesPreset(record, preset));
}

export function getPresetCounts(
  records: StayRecord[]
): Record<PresetKey, number> {
  return {
    luxury: records.filter((record) => matchesPreset(record, "luxury")).length,
    "design-led": records.filter((record) => matchesPreset(record, "design-led")).length,
    onsen: records.filter((record) => matchesPreset(record, "onsen")).length,
    family: records.filter((record) => matchesPreset(record, "family")).length,
    "slow-travel": records.filter((record) => matchesPreset(record, "slow-travel")).length,
  };
}

export function sortFilteredStays(
  records: StayRecord[],
  sort: SortKey
): StayRecord[] {
  switch (sort) {
    case "recent":
      return [...records].sort((a, b) => {
        const dateDelta =
          Date.parse(b.lastReviewedAt) - Date.parse(a.lastReviewedAt);
        if (dateDelta !== 0) {
          return dateDelta;
        }
        return compareStayPriority(a, b);
      });

    case "name":
      return [...records].sort((a, b) => a.name.localeCompare(b.name));

    case "priority":
    default:
      return sortStays(records);
  }
}

export function getRegionCounts(records: StayRecord[]): Record<Region, number> {
  const counts: Record<Region, number> = {
    hokkaido: 0,
    tohoku: 0,
    tokyo: 0,
    central: 0,
    kansai: 0,
    kyushu: 0,
  };

  for (const record of records) {
    counts[record.region] += 1;
  }

  return counts;
}

export function getStayTypeCounts(
  records: StayRecord[]
): Record<StayType, number> {
  const counts: Record<StayType, number> = {
    hotel: 0,
    ryokan: 0,
    villa: 0,
    hostel: 0,
    resort: 0,
    aparthotel: 0,
  };

  for (const record of records) {
    counts[record.stayType] += 1;
  }

  return counts;
}

export function buildSignalsHref(options: {
  region?: Region;
  stayType?: StayType;
  q?: string;
  sort?: SortKey;
  preset?: PresetKey;
  compare?: string[];
}): string {
  const params = new URLSearchParams();

  if (options.region) {
    params.set("region", options.region);
  }

  if (options.stayType) {
    params.set("type", options.stayType);
  }

  if (options.q && options.q.trim().length > 0) {
    params.set("q", options.q.trim());
  }

  if (options.sort && options.sort !== "priority") {
    params.set("sort", options.sort);
  }

  if (options.preset) {
    params.set("preset", options.preset);
  }

  if (options.compare && options.compare.length > 0) {
    params.set("compare", options.compare.join(","));
  }

  const query = params.toString();
  return query ? `/signals?${query}` : "/signals";
}

export function buildComparePageHref(slugs: string[]): string {
  const normalized = [...new Set(
    slugs.map((slug) => slug.trim()).filter(Boolean)
  )].slice(0, 4);

  const params = new URLSearchParams();

  if (normalized.length > 0) {
    params.set("slugs", normalized.join(","));
  }

  const query = params.toString();
  return query ? `/signals/compare?${query}` : "/signals/compare";
}

export function buildDashboardOverview(
  records: StayRecord[]
): DashboardOverview {
  return {
    total: records.length,
    rising: records.filter((record) => record.momentum === "rising").length,
    core: records.filter((record) => record.tier === "core").length,
    highTrust: records.filter((record) => record.trust === "high").length,
  };
}

export function buildDashboardInsights(
  records: StayRecord[]
): DashboardInsights {
  return {
    dominantMomentum: summarizeDominantMomentum(records),
    trustWatch: summarizeTrustWatch(records),
    fitFocus: summarizeFitFocus(records),
  };
}

export function pickFeaturedStays(
  records: StayRecord[],
  limit = 3
): StayRecord[] {
  const sorted = sortStays(records);
  const featured: StayRecord[] = [];
  const usedIds = new Set<string>();
  const usedRegions = new Set<string>();

  for (const record of sorted) {
    if (featured.length >= limit) {
      break;
    }

    if (usedRegions.has(record.region)) {
      continue;
    }

    featured.push(record);
    usedIds.add(record.id);
    usedRegions.add(record.region);
  }

  for (const record of sorted) {
    if (featured.length >= limit) {
      break;
    }

    if (usedIds.has(record.id)) {
      continue;
    }

    featured.push(record);
    usedIds.add(record.id);
  }

  return featured;
}

function matchesPreset(record: StayRecord, preset: PresetKey): boolean {
  const text = [
    record.name,
    record.headline,
    record.summary,
    record.heroNote ?? "",
    ...record.fitTags,
    ...record.highlights,
    ...(record.editorialNotes ?? []),
  ]
    .join(" ")
    .toLowerCase();

  switch (preset) {
    case "luxury":
      return (
        record.priceBand === "luxury" ||
        text.includes("luxury") ||
        text.includes("premium")
      );

    case "design-led":
      return text.includes("design");

    case "onsen":
      return record.stayType === "ryokan" || text.includes("onsen");

    case "family":
      return (
        text.includes("famil") ||
        text.includes("group") ||
        text.includes("small groups")
      );

    case "slow-travel":
      return (
        text.includes("slow travel") ||
        text.includes("slower") ||
        text.includes("longer stay") ||
        text.includes("long weekend") ||
        text.includes("restorative") ||
        text.includes("scenic") ||
        text.includes("regional trip") ||
        text.includes("calm")
      );

    default:
      return true;
  }
}

function summarizeDominantMomentum(
  records: StayRecord[]
): DashboardInsights["dominantMomentum"] {
  if (records.length === 0) {
    return {
      key: "none",
      label: "No current momentum",
      count: 0,
      summary: "There are no current results to summarize in this slice.",
    };
  }

  const order: Momentum[] = ["rising", "steady", "cooling", "insufficient"];
  const counts: Record<Momentum, number> = {
    rising: 0,
    steady: 0,
    cooling: 0,
    insufficient: 0,
  };

  for (const record of records) {
    counts[record.momentum] += 1;
  }

  let dominant: Momentum = "rising";
  for (const key of order) {
    if (counts[key] > counts[dominant]) {
      dominant = key;
    }
  }

  const count = counts[dominant];

  switch (dominant) {
    case "rising":
      return {
        key: dominant,
        label: getMomentumLabel(dominant),
        count,
        summary:
          "The current slice leans toward entries with stronger near-term editorial momentum.",
      };
    case "steady":
      return {
        key: dominant,
        label: getMomentumLabel(dominant),
        count,
        summary:
          "Most current entries read as stable rather than sharply accelerating.",
      };
    case "cooling":
      return {
        key: dominant,
        label: getMomentumLabel(dominant),
        count,
        summary:
          "The board currently contains more entries that look quieter or less urgent.",
      };
    case "insufficient":
      return {
        key: dominant,
        label: getMomentumLabel(dominant),
        count,
        summary:
          "A large share of the current slice still lacks enough evidence for a directional call.",
      };
    default:
      return {
        key: "none",
        label: "No current momentum",
        count: 0,
        summary: "There are no current results to summarize in this slice.",
      };
  }
}

function summarizeTrustWatch(
  records: StayRecord[]
): DashboardInsights["trustWatch"] {
  const count = records.filter(
    (record) => record.trust === "low" || record.momentum === "insufficient"
  ).length;

  if (count === 0) {
    return {
      count,
      summary:
        "This slice does not currently show obvious low-confidence entries.",
    };
  }

  if (count === 1) {
    return {
      count,
      summary:
        "There is one entry that still needs more evidence or more careful treatment.",
    };
  }

  return {
    count,
    summary:
      "Several entries still sit in watch mode because the supporting evidence is thinner.",
  };
}

function summarizeFitFocus(
  records: StayRecord[]
): DashboardInsights["fitFocus"] {
  const counts = new Map<string, number>();

  for (const record of records) {
    for (const tag of record.fitTags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  if (counts.size === 0) {
    return null;
  }

  const top = [...counts.entries()].sort((a, b) => {
    if (b[1] !== a[1]) {
      return b[1] - a[1];
    }
    return a[0].localeCompare(b[0]);
  })[0];

  return {
    label: top[0],
    count: top[1],
    summary:
      "This is the strongest recurring traveler-fit theme in the current result set.",
  };
}