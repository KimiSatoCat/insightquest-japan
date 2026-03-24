import type {
  Momentum,
  MomentumInputs,
  Region,
  StayRecord,
  StayType,
  Tier,
  TrustLevel,
} from "../types";
import {
  REGION_LABELS,
  STAY_TYPE_LABELS,
} from "../types";

const momentumPriority: Record<Momentum, number> = {
  rising: 0,
  steady: 1,
  cooling: 2,
  insufficient: 3,
};

const trustPriority: Record<TrustLevel, number> = {
  high: 0,
  medium: 1,
  low: 2,
};

const tierPriority: Record<Tier, number> = {
  core: 0,
  watchlist: 1,
  unlisted: 2,
};

export function getRegionLabel(region: Region): string {
  return REGION_LABELS[region];
}

export function getStayTypeLabel(stayType: StayType): string {
  return STAY_TYPE_LABELS[stayType];
}

export function getMomentumLabel(momentum: Momentum): string {
  switch (momentum) {
    case "rising":
      return "Rising";
    case "steady":
      return "Steady";
    case "cooling":
      return "Cooling";
    case "insufficient":
      return "Insufficient";
    default:
      return momentum;
  }
}

export function getTrustLabel(trust: TrustLevel): string {
  switch (trust) {
    case "high":
      return "High trust";
    case "medium":
      return "Medium trust";
    case "low":
      return "Low trust";
    default:
      return trust;
  }
}

export function getTierLabel(tier: Tier): string {
  switch (tier) {
    case "core":
      return "Core";
    case "watchlist":
      return "Watchlist";
    case "unlisted":
      return "Unlisted";
    default:
      return tier;
  }
}

export function getMomentumToneClass(momentum: Momentum): string {
  switch (momentum) {
    case "rising":
      return "badge-rising";
    case "steady":
      return "badge-steady";
    case "cooling":
      return "badge-cooling";
    case "insufficient":
      return "badge-insufficient";
    default:
      return "badge-insufficient";
  }
}

export function getTrustToneClass(trust: TrustLevel): string {
  switch (trust) {
    case "high":
      return "badge-trust-high";
    case "medium":
      return "badge-trust-medium";
    case "low":
      return "badge-trust-low";
    default:
      return "badge-trust-low";
  }
}

export function getTierToneClass(tier: Tier): string {
  switch (tier) {
    case "core":
      return "badge-tier-core";
    case "watchlist":
      return "badge-tier-watchlist";
    case "unlisted":
      return "badge-tier-unlisted";
    default:
      return "badge-tier-unlisted";
  }
}

export function hasOfficialSource(record: StayRecord): boolean {
  return record.sourceLinks.some((link) => link.kind === "official");
}

export function hasBookingSource(record: StayRecord): boolean {
  return record.sourceLinks.some((link) => link.kind === "booking");
}

export function getPriorityScore(record: StayRecord): number {
  const tierScore = tierPriority[record.tier] * 100;
  const momentumScore = momentumPriority[record.momentum] * 10;
  const trustScore = trustPriority[record.trust];
  return tierScore + momentumScore + trustScore;
}

export function compareStayPriority(a: StayRecord, b: StayRecord): number {
  const priorityDelta = getPriorityScore(a) - getPriorityScore(b);
  if (priorityDelta !== 0) {
    return priorityDelta;
  }

  const dateDelta =
    Date.parse(b.lastReviewedAt) - Date.parse(a.lastReviewedAt);
  if (dateDelta !== 0) {
    return dateDelta;
  }

  return a.name.localeCompare(b.name);
}

export function sortStays(records: StayRecord[]): StayRecord[] {
  return [...records].sort(compareStayPriority);
}

export function groupStaysByRegion(
  records: StayRecord[]
): Record<Region, StayRecord[]> {
  return records.reduce(
    (acc, record) => {
      acc[record.region].push(record);
      return acc;
    },
    {
      hokkaido: [] as StayRecord[],
      tohoku: [] as StayRecord[],
      tokyo: [] as StayRecord[],
      central: [] as StayRecord[],
      kansai: [] as StayRecord[],
      kyushu: [] as StayRecord[],
    }
  );
}

export function suggestMomentum(inputs?: MomentumInputs): Momentum {
  if (!inputs) {
    return "insufficient";
  }

  if (
    inputs.sourceDepth === "thin" &&
    inputs.recentCoverageLevel === "none" &&
    inputs.bookingInterestSignal === "unknown"
  ) {
    return "insufficient";
  }

  let score = 0;

  score += scoreCoverage(inputs.recentCoverageLevel);
  score += scoreBookingInterest(inputs.bookingInterestSignal);
  score += scoreFreshness(inputs.listingFreshness);
  score += scoreSeasonalAttention(inputs.seasonalAttention);
  score += scoreSourceDepth(inputs.sourceDepth);

  if (score >= 5) {
    return "rising";
  }

  if (score >= 1) {
    return "steady";
  }

  return "cooling";
}

export function suggestTrustLevel(
  record: Pick<StayRecord, "sourceLinks" | "momentumInputs">
): TrustLevel {
  const sourceCount = record.sourceLinks.length;
  const hasOfficial = record.sourceLinks.some((link) => link.kind === "official");
  const depth = record.momentumInputs?.sourceDepth ?? "thin";

  if (hasOfficial && sourceCount >= 3 && depth === "deep") {
    return "high";
  }

  if (hasOfficial && sourceCount >= 2 && depth !== "thin") {
    return "medium";
  }

  return "low";
}

export function isSignalConsistent(record: StayRecord): boolean {
  const suggestedMomentum = suggestMomentum(record.momentumInputs);
  const suggestedTrust = suggestTrustLevel(record);

  const momentumCompatible =
    record.momentum === suggestedMomentum ||
    record.momentum === "steady" ||
    suggestedMomentum === "steady";

  const trustCompatible =
    record.trust === suggestedTrust ||
    (record.trust === "medium" && suggestedTrust !== "low");

  return momentumCompatible && trustCompatible;
}

function scoreCoverage(level: MomentumInputs["recentCoverageLevel"]): number {
  switch (level) {
    case "high":
      return 2;
    case "medium":
      return 1;
    case "low":
      return 0;
    case "none":
      return -2;
    default:
      return 0;
  }
}

function scoreBookingInterest(
  signal: MomentumInputs["bookingInterestSignal"]
): number {
  switch (signal) {
    case "strong":
      return 2;
    case "moderate":
      return 1;
    case "soft":
      return 0;
    case "unknown":
      return -1;
    default:
      return 0;
  }
}

function scoreFreshness(
  freshness: MomentumInputs["listingFreshness"]
): number {
  switch (freshness) {
    case "new":
      return 2;
    case "recent":
      return 1;
    case "stable":
      return 0;
    case "stale":
      return -1;
    default:
      return 0;
  }
}

function scoreSeasonalAttention(
  attention: MomentumInputs["seasonalAttention"]
): number {
  switch (attention) {
    case "high":
      return 1;
    case "medium":
      return 0;
    case "low":
      return -1;
    case "off-season":
      return -1;
    default:
      return 0;
  }
}

function scoreSourceDepth(depth: MomentumInputs["sourceDepth"]): number {
  switch (depth) {
    case "deep":
      return 1;
    case "moderate":
      return 0;
    case "thin":
      return -1;
    default:
      return 0;
  }
}