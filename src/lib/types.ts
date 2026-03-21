export type Region =
  | "tokyo"
  | "kyoto"
  | "fukuoka"
  | "hakone"
  | "nagano"
  | "okinawa";

export const REGION_LABELS: Record<Region, string> = {
  tokyo: "Tokyo",
  kyoto: "Kyoto",
  fukuoka: "Fukuoka",
  hakone: "Hakone",
  nagano: "Nagano",
  okinawa: "Okinawa",
};

export type StayType = "hotel" | "ryokan" | "hostel" | "villa";

export const STAY_TYPE_LABELS: Record<StayType, string> = {
  hotel: "Hotel",
  ryokan: "Ryokan",
  hostel: "Hostel",
  villa: "Villa",
};

export type TrustLevel = "high" | "medium" | "low";

export const TRUST_LABELS: Record<TrustLevel, string> = {
  high: "Well-documented",
  medium: "Moderate info",
  low: "Limited info",
};

export type TierLevel = "core" | "watchlist" | "unlisted";

export const TIER_LABELS: Record<TierLevel, string> = {
  core: "Core",
  watchlist: "Watchlist",
  unlisted: "Unlisted",
};

export type FitTag =
  | "onsen"
  | "cultural"
  | "nature"
  | "urban"
  | "beach"
  | "family"
  | "solo"
  | "wellness";

export const FIT_TAG_LABELS: Record<FitTag, string> = {
  onsen: "Onsen",
  cultural: "Cultural",
  nature: "Nature",
  urban: "Urban",
  beach: "Beach",
  family: "Family",
  solo: "Solo",
  wellness: "Wellness",
};

export type MomentumLabel = "rising" | "steady" | "cooling" | "insufficient";

export interface Facility {
  id: string;
  name: string;
  region: Region;
  stayType: StayType;
  trustLevel: TrustLevel;
  tierLevel: TierLevel;
  fitTags: FitTag[];
  summary: string;
  location: string;
  priceNote: string;
  externalUrl: string | null;
}

export interface MomentumEntry {
  region: Region;
  stayType: StayType;
  label: MomentumLabel;
  rationale: string;
}
