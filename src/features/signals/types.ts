export const REGIONS = [
  "hokkaido",
  "tohoku",
  "tokyo",
  "central",
  "kansai",
  "kyushu",
] as const;

export type Region = (typeof REGIONS)[number];

export const REGION_LABELS: Record<Region, string> = {
  hokkaido: "Hokkaido",
  tohoku: "Tohoku",
  tokyo: "Tokyo",
  central: "Central Japan",
  kansai: "Kansai",
  kyushu: "Kyushu",
};

export const STAY_TYPES = [
  "hotel",
  "ryokan",
  "villa",
  "hostel",
  "resort",
  "aparthotel",
] as const;

export type StayType = (typeof STAY_TYPES)[number];

export const STAY_TYPE_LABELS: Record<StayType, string> = {
  hotel: "Hotel",
  ryokan: "Ryokan",
  villa: "Villa",
  hostel: "Hostel",
  resort: "Resort",
  aparthotel: "Aparthotel",
};

export const MOMENTUM_VALUES = [
  "rising",
  "steady",
  "cooling",
  "insufficient",
] as const;

export type Momentum = (typeof MOMENTUM_VALUES)[number];

export const TRUST_LEVELS = ["high", "medium", "low"] as const;

export type TrustLevel = (typeof TRUST_LEVELS)[number];

export const TIERS = ["core", "watchlist", "unlisted"] as const;

export type Tier = (typeof TIERS)[number];

export const PRICE_BANDS = ["budget", "mid", "upper-mid", "luxury"] as const;

export type PriceBand = (typeof PRICE_BANDS)[number];

export const SOURCE_LINK_KINDS = [
  "official",
  "booking",
  "review",
  "editorial",
  "social",
  "other",
] as const;

export type SourceLinkKind = (typeof SOURCE_LINK_KINDS)[number];

export type CoverageLevel = "high" | "medium" | "low" | "none";
export type BookingInterestSignal = "strong" | "moderate" | "soft" | "unknown";
export type ListingFreshness = "new" | "recent" | "stable" | "stale";
export type SeasonalAttention = "high" | "medium" | "low" | "off-season";
export type SourceDepth = "deep" | "moderate" | "thin";

export interface SourceLink {
  label: string;
  url: string;
  kind: SourceLinkKind;
}

export interface MomentumInputs {
  recentCoverageLevel: CoverageLevel;
  bookingInterestSignal: BookingInterestSignal;
  listingFreshness: ListingFreshness;
  seasonalAttention: SeasonalAttention;
  sourceDepth: SourceDepth;
}

export interface ReviewHistoryEntry {
  date: string;
  change: string;
  editorNote?: string;
}

export interface StayRecord {
  id: string;
  slug: string;
  name: string;
  region: Region;
  city: string;
  stayType: StayType;
  priceBand: PriceBand;

  headline: string;
  summary: string;
  heroNote?: string;

  fitTags: string[];
  highlights: string[];

  momentum: Momentum;
  momentumRationale: string;

  trust: TrustLevel;
  trustRationale: string;

  tier: Tier;
  tierRationale: string;

  lastReviewedAt: string;

  officialUrl?: string;
  bookingUrl?: string;
  sourceLinks: SourceLink[];

  momentumInputs?: MomentumInputs;
  editorialNotes?: string[];
  reviewHistory?: ReviewHistoryEntry[];
}