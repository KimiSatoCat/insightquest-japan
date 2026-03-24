import { dummyStayDataSource } from "../data/source";
import type { Region, StayRecord, StayType } from "../types";
import { compareStayPriority, getPriorityScore, sortStays } from "./momentum";
import {
  buildDashboardInsights,
  buildDashboardOverview,
  filterByPreset,
  filterStays,
  getPresetCounts,
  getRegionCounts,
  getStayTypeCounts,
  pickFeaturedStays,
  searchStays,
  sortFilteredStays,
  type DashboardInsights,
  type PresetKey,
  type SortKey,
} from "./selectors";

export interface SignalsDashboardQuery {
  region?: Region;
  stayType?: StayType;
  q?: string;
  sort?: SortKey;
  preset?: PresetKey;
}

export interface SignalsDashboardData {
  totalCount: number;
  filteredCount: number;
  filtered: StayRecord[];
  featured: StayRecord[];
  overview: {
    total: number;
    rising: number;
    core: number;
    highTrust: number;
  };
  insights: DashboardInsights;
  presetBaseCount: number;
  presetCounts: Record<PresetKey, number>;
  regionCounts: Record<Region, number>;
  stayTypeCounts: Record<StayType, number>;
}

export interface StayDetailComparison {
  regionRank: number;
  regionTotal: number;
  sameTypeRank: number;
  sameTypeTotal: number;
  higherPriorityInRegion: number;
  regionLeaderName: string;
  summary: string;
}

export interface StayDetailPageData {
  stay: StayRecord;
  related: StayRecord[];
  comparison: StayDetailComparison;
}

export interface ComparePageData {
  stays: StayRecord[];
  lead: StayRecord | null;
  commonFitTags: string[];
  summary: string;
}

export async function getSignalsDashboardData(
  query: SignalsDashboardQuery = {}
): Promise<SignalsDashboardData> {
  const allRecords = await dummyStayDataSource.listStays();
  const normalizedSort = query.sort ?? "priority";

  const presetBase = searchStays(
    filterStays(allRecords, {
      region: query.region,
      stayType: query.stayType,
    }),
    query.q
  );

  const regionScoped = filterByPreset(
    searchStays(
      filterStays(allRecords, {
        stayType: query.stayType,
      }),
      query.q
    ),
    query.preset
  );

  const typeScoped = filterByPreset(
    searchStays(
      filterStays(allRecords, {
        region: query.region,
      }),
      query.q
    ),
    query.preset
  );

  const filtered = sortFilteredStays(
    filterByPreset(presetBase, query.preset),
    normalizedSort
  );

  return {
    totalCount: allRecords.length,
    filteredCount: filtered.length,
    filtered,
    featured: pickFeaturedStays(filtered, 3),
    overview: buildDashboardOverview(filtered),
    insights: buildDashboardInsights(filtered),
    presetBaseCount: presetBase.length,
    presetCounts: getPresetCounts(presetBase),
    regionCounts: getRegionCounts(regionScoped),
    stayTypeCounts: getStayTypeCounts(typeScoped),
  };
}

export async function getStayDetailBySlug(
  slug: string
): Promise<StayRecord | null> {
  return dummyStayDataSource.getStayBySlug(slug);
}

export async function getStaysBySlugs(
  slugs: string[]
): Promise<StayRecord[]> {
  const allRecords = await dummyStayDataSource.listStays();
  const map = new Map(allRecords.map((record) => [record.slug, record]));
  return slugs
    .map((slug) => map.get(slug))
    .filter((record): record is StayRecord => Boolean(record));
}

export async function getComparePageData(
  slugs: string[]
): Promise<ComparePageData> {
  const stays = sortStays(await getStaysBySlugs(slugs));
  const lead = stays[0] ?? null;
  const commonFitTags = getCommonFitTags(stays);

  return {
    stays,
    lead,
    commonFitTags,
    summary: buildCompareSummary(stays, commonFitTags),
  };
}

export async function getAllStaySlugs(): Promise<string[]> {
  const allRecords = await dummyStayDataSource.listStays();
  return allRecords.map((record) => record.slug);
}

export async function getRelatedStaysByRegion(
  slug: string,
  limit = 3
): Promise<StayRecord[]> {
  const target = await dummyStayDataSource.getStayBySlug(slug);
  if (!target) {
    return [];
  }

  const allRecords = await dummyStayDataSource.listStays();

  return sortStays(
    allRecords.filter(
      (record) => record.slug !== slug && record.region === target.region
    )
  ).slice(0, limit);
}

export async function getStayDetailPageData(
  slug: string,
  relatedLimit = 3
): Promise<StayDetailPageData | null> {
  const allRecords = await dummyStayDataSource.listStays();
  const stay = allRecords.find((record) => record.slug === slug);

  if (!stay) {
    return null;
  }

  const regionPeers = sortStays(
    allRecords.filter((record) => record.region === stay.region)
  );

  const sameTypePeers = sortStays(
    allRecords.filter(
      (record) =>
        record.region === stay.region && record.stayType === stay.stayType
    )
  );

  const related = regionPeers
    .filter((record) => record.slug !== stay.slug)
    .slice(0, relatedLimit);

  const regionRank =
    regionPeers.findIndex((record) => record.slug === stay.slug) + 1;

  const sameTypeRank =
    sameTypePeers.findIndex((record) => record.slug === stay.slug) + 1;

  const higherPriorityInRegion = regionPeers.filter(
    (record) =>
      record.slug !== stay.slug &&
      compareStayPriority(record, stay) < 0
  ).length;

  const regionLeaderName = regionPeers[0]?.name ?? stay.name;

  return {
    stay,
    related,
    comparison: {
      regionRank,
      regionTotal: regionPeers.length,
      sameTypeRank: sameTypeRank || 1,
      sameTypeTotal: sameTypePeers.length || 1,
      higherPriorityInRegion,
      regionLeaderName,
      summary: buildComparisonSummary({
        stay,
        regionRank,
        regionTotal: regionPeers.length,
        sameTypeRank: sameTypeRank || 1,
        sameTypeTotal: sameTypePeers.length || 1,
        higherPriorityInRegion,
        regionLeaderName,
      }),
    },
  };
}

function buildComparisonSummary(input: {
  stay: StayRecord;
  regionRank: number;
  regionTotal: number;
  sameTypeRank: number;
  sameTypeTotal: number;
  higherPriorityInRegion: number;
  regionLeaderName: string;
}): string {
  const { stay, regionRank, regionTotal, sameTypeRank, sameTypeTotal, higherPriorityInRegion, regionLeaderName } = input;

  if (regionTotal <= 1) {
    return `${stay.name} is currently the only property in this regional slice, so its signal is being read without nearby peers.`;
  }

  if (regionRank === 1) {
    if (sameTypeTotal > 1 && sameTypeRank === 1) {
      return `${stay.name} currently leads both the regional slice and the local ${stay.stayType} grouping, which makes it a strong anchor entry for this area.`;
    }

    return `${stay.name} currently leads its regional slice, which suggests that its momentum, trust, and tier combination is stronger than nearby alternatives.`;
  }

  if (higherPriorityInRegion === 1) {
    return `${stay.name} sits just behind ${regionLeaderName} in the current regional stack, so it remains competitive but not quite the lead recommendation.`;
  }

  if (sameTypeTotal > 1 && sameTypeRank === 1) {
    return `${stay.name} is not the overall regional leader, but it currently leads within the local ${stay.stayType} set, which gives it a clearer role for that stay style.`;
  }

  return `${stay.name} sits in the middle of the current regional stack, which suggests it is useful and relevant but not the strongest lead candidate right now.`;
}

function getCommonFitTags(stays: StayRecord[]): string[] {
  if (stays.length === 0) {
    return [];
  }

  const [first, ...rest] = stays;
  return first.fitTags.filter((tag) =>
    rest.every((stay) => stay.fitTags.includes(tag))
  );
}

function buildCompareSummary(
  stays: StayRecord[],
  commonFitTags: string[]
): string {
  if (stays.length === 0) {
    return "No stays are currently selected for comparison.";
  }

  if (stays.length === 1) {
    return `${stays[0].name} is selected, but comparison becomes more useful when at least one additional stay is added.`;
  }

  const lead = stays[0];
  const second = stays[1];

  if (commonFitTags.length > 0) {
    return `${lead.name} currently sits at the front of this comparison set. The selected stays still share a common traveler-fit theme around ${commonFitTags.slice(0, 2).join(" / ")}.`;
  }

  return `${lead.name} currently leads this comparison set on the present priority stack, while ${second.name} is the closest nearby alternative in the selected group.`;
}

export function getStayPriorityBand(stay: StayRecord): "lead" | "upper" | "mid" | "watch" {
  const score = getPriorityScore(stay);

  if (score <= 10) return "lead";
  if (score <= 60) return "upper";
  if (score <= 130) return "mid";
  return "watch";
}