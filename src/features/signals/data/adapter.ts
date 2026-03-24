import type {
  StayRecord,
  MomentumInputs,
  SourceLink,
  ReviewHistoryEntry,
} from "../types";
import {
  MOMENTUM_VALUES,
  PRICE_BANDS,
  REGIONS,
  SOURCE_LINK_KINDS,
  STAY_TYPES,
  TIERS,
  TRUST_LEVELS,
} from "../types";

const COVERAGE_LEVELS = ["high", "medium", "low", "none"] as const;
const BOOKING_INTEREST_SIGNALS = ["strong", "moderate", "soft", "unknown"] as const;
const LISTING_FRESHNESS_VALUES = ["new", "recent", "stable", "stale"] as const;
const SEASONAL_ATTENTION_VALUES = ["high", "medium", "low", "off-season"] as const;
const SOURCE_DEPTH_VALUES = ["deep", "moderate", "thin"] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function expectString(value: unknown, path: string): string {
  if (typeof value !== "string") {
    throw new Error(`${path} must be a string.`);
  }
  return value;
}

function optionalString(value: unknown, path: string): string | undefined {
  if (value == null) {
    return undefined;
  }
  return expectString(value, path);
}

function expectStringArray(value: unknown, path: string): string[] {
  if (!Array.isArray(value) || !value.every((item) => typeof item === "string")) {
    throw new Error(`${path} must be an array of strings.`);
  }
  return value;
}

function expectEnum<T extends readonly string[]>(
  value: unknown,
  allowed: T,
  path: string
): T[number] {
  if (typeof value !== "string" || !allowed.includes(value)) {
    throw new Error(`${path} must be one of: ${allowed.join(", ")}.`);
  }
  return value as T[number];
}

function parseSourceLink(value: unknown, path: string): SourceLink {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  return {
    label: expectString(value.label, `${path}.label`),
    url: expectString(value.url, `${path}.url`),
    kind: expectEnum(value.kind, SOURCE_LINK_KINDS, `${path}.kind`),
  };
}

function parseSourceLinks(value: unknown, path: string): SourceLink[] {
  if (!Array.isArray(value)) {
    throw new Error(`${path} must be an array.`);
  }

  return value.map((item, index) => parseSourceLink(item, `${path}[${index}]`));
}

function parseMomentumInputs(
  value: unknown,
  path: string
): MomentumInputs | undefined {
  if (value == null) {
    return undefined;
  }

  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  return {
    recentCoverageLevel: expectEnum(
      value.recentCoverageLevel,
      COVERAGE_LEVELS,
      `${path}.recentCoverageLevel`
    ),
    bookingInterestSignal: expectEnum(
      value.bookingInterestSignal,
      BOOKING_INTEREST_SIGNALS,
      `${path}.bookingInterestSignal`
    ),
    listingFreshness: expectEnum(
      value.listingFreshness,
      LISTING_FRESHNESS_VALUES,
      `${path}.listingFreshness`
    ),
    seasonalAttention: expectEnum(
      value.seasonalAttention,
      SEASONAL_ATTENTION_VALUES,
      `${path}.seasonalAttention`
    ),
    sourceDepth: expectEnum(
      value.sourceDepth,
      SOURCE_DEPTH_VALUES,
      `${path}.sourceDepth`
    ),
  };
}

function parseReviewHistoryEntry(
  value: unknown,
  path: string
): ReviewHistoryEntry {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  return {
    date: expectString(value.date, `${path}.date`),
    change: expectString(value.change, `${path}.change`),
    editorNote: optionalString(value.editorNote, `${path}.editorNote`),
  };
}

function parseReviewHistory(
  value: unknown,
  path: string
): ReviewHistoryEntry[] | undefined {
  if (value == null) {
    return undefined;
  }

  if (!Array.isArray(value)) {
    throw new Error(`${path} must be an array.`);
  }

  return value.map((item, index) =>
    parseReviewHistoryEntry(item, `${path}[${index}]`)
  );
}

export function parseStayRecord(value: unknown, path = "stay"): StayRecord {
  if (!isRecord(value)) {
    throw new Error(`${path} must be an object.`);
  }

  return {
    id: expectString(value.id, `${path}.id`),
    slug: expectString(value.slug, `${path}.slug`),
    name: expectString(value.name, `${path}.name`),
    region: expectEnum(value.region, REGIONS, `${path}.region`),
    city: expectString(value.city, `${path}.city`),
    stayType: expectEnum(value.stayType, STAY_TYPES, `${path}.stayType`),
    priceBand: expectEnum(value.priceBand, PRICE_BANDS, `${path}.priceBand`),

    headline: expectString(value.headline, `${path}.headline`),
    summary: expectString(value.summary, `${path}.summary`),
    heroNote: optionalString(value.heroNote, `${path}.heroNote`),

    fitTags: expectStringArray(value.fitTags, `${path}.fitTags`),
    highlights: expectStringArray(value.highlights, `${path}.highlights`),

    momentum: expectEnum(value.momentum, MOMENTUM_VALUES, `${path}.momentum`),
    momentumRationale: expectString(
      value.momentumRationale,
      `${path}.momentumRationale`
    ),

    trust: expectEnum(value.trust, TRUST_LEVELS, `${path}.trust`),
    trustRationale: expectString(value.trustRationale, `${path}.trustRationale`),

    tier: expectEnum(value.tier, TIERS, `${path}.tier`),
    tierRationale: expectString(value.tierRationale, `${path}.tierRationale`),

    lastReviewedAt: expectString(value.lastReviewedAt, `${path}.lastReviewedAt`),

    officialUrl: optionalString(value.officialUrl, `${path}.officialUrl`),
    bookingUrl: optionalString(value.bookingUrl, `${path}.bookingUrl`),
    sourceLinks: parseSourceLinks(value.sourceLinks, `${path}.sourceLinks`),

    momentumInputs: parseMomentumInputs(value.momentumInputs, `${path}.momentumInputs`),
    editorialNotes:
      value.editorialNotes == null
        ? undefined
        : expectStringArray(value.editorialNotes, `${path}.editorialNotes`),
    reviewHistory: parseReviewHistory(value.reviewHistory, `${path}.reviewHistory`),
  };
}

export function parseStayRecordArray(value: unknown): StayRecord[] {
  if (!Array.isArray(value)) {
    throw new Error(`stays.json must contain an array.`);
  }

  return value.map((item, index) => parseStayRecord(item, `stays[${index}]`));
}