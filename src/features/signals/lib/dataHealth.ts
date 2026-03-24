import { dummyStayDataSource } from "../data/source";
import {
  REGIONS,
  STAY_TYPES,
  type Region,
  type StayRecord,
  type StayType,
} from "../types";

export interface DataHealthIssueItem {
  slug: string;
  name: string;
  note: string;
}

export interface DuplicateGroup {
  value: string;
  count: number;
  slugs: string[];
}

export interface ReadinessItem {
  slug: string;
  name: string;
  score: number;
  label: "Ready" | "Usable" | "Needs work" | "Fragile";
  issues: string[];
  recommendedAction: string;
}

export interface SignalsDataHealthReport {
  totalStays: number;
  generatedAt: string;
  coverageByRegion: Record<Region, number>;
  coverageByType: Record<StayType, number>;
  summary: {
    duplicateSlugGroups: number;
    duplicateIdGroups: number;
    missingOfficialUrlCount: number;
    thinEvidenceCount: number;
    missingEditorialNotesCount: number;
    lowConfidenceCount: number;
  };
  issues: {
    duplicateSlugs: DuplicateGroup[];
    duplicateIds: DuplicateGroup[];
    missingOfficialUrl: DataHealthIssueItem[];
    thinEvidence: DataHealthIssueItem[];
    missingEditorialNotes: DataHealthIssueItem[];
    lowConfidence: DataHealthIssueItem[];
  };
  readinessQueue: ReadinessItem[];
}

export async function getSignalsDataHealthReport(): Promise<SignalsDataHealthReport> {
  const records = await dummyStayDataSource.listStays();

  const coverageByRegion = buildRegionCounts(records);
  const coverageByType = buildStayTypeCounts(records);

  const duplicateSlugs = findDuplicateGroups(records, (record) => record.slug);
  const duplicateIds = findDuplicateGroups(records, (record) => record.id);

  const missingOfficialUrl = records
    .filter((record) => !record.officialUrl || record.officialUrl.trim().length === 0)
    .map((record) => ({
      slug: record.slug,
      name: record.name,
      note: "Official URL is missing.",
    }));

  const thinEvidence = records
    .filter((record) => {
      const sourceDepth = record.momentumInputs?.sourceDepth;
      return record.sourceLinks.length < 2 || sourceDepth === "thin";
    })
    .map((record) => ({
      slug: record.slug,
      name: record.name,
      note:
        record.sourceLinks.length < 2
          ? `Only ${record.sourceLinks.length} source link(s) available.`
          : "Momentum input marks source depth as thin.",
    }));

  const missingEditorialNotes = records
    .filter(
      (record) =>
        !record.editorialNotes || record.editorialNotes.length === 0
    )
    .map((record) => ({
      slug: record.slug,
      name: record.name,
      note: "No editorial notes have been added.",
    }));

  const lowConfidence = records
    .filter(
      (record) =>
        record.trust === "low" || record.momentum === "insufficient"
    )
    .map((record) => ({
      slug: record.slug,
      name: record.name,
      note:
        record.trust === "low" && record.momentum === "insufficient"
          ? "Low trust and insufficient momentum."
          : record.trust === "low"
            ? "Trust is marked as low."
            : "Momentum is marked as insufficient.",
    }));

  return {
    totalStays: records.length,
    generatedAt: new Date().toISOString(),
    coverageByRegion,
    coverageByType,
    summary: {
      duplicateSlugGroups: duplicateSlugs.length,
      duplicateIdGroups: duplicateIds.length,
      missingOfficialUrlCount: missingOfficialUrl.length,
      thinEvidenceCount: thinEvidence.length,
      missingEditorialNotesCount: missingEditorialNotes.length,
      lowConfidenceCount: lowConfidence.length,
    },
    issues: {
      duplicateSlugs,
      duplicateIds,
      missingOfficialUrl,
      thinEvidence,
      missingEditorialNotes,
      lowConfidence,
    },
    readinessQueue: buildReadinessQueue(records),
  };
}

function buildRegionCounts(records: StayRecord[]): Record<Region, number> {
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

function buildStayTypeCounts(records: StayRecord[]): Record<StayType, number> {
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

function findDuplicateGroups(
  records: StayRecord[],
  selector: (record: StayRecord) => string
): DuplicateGroup[] {
  const map = new Map<string, StayRecord[]>();

  for (const record of records) {
    const key = selector(record);
    const current = map.get(key) ?? [];
    current.push(record);
    map.set(key, current);
  }

  return [...map.entries()]
    .filter(([, items]) => items.length > 1)
    .map(([value, items]) => ({
      value,
      count: items.length,
      slugs: items.map((item) => item.slug),
    }))
    .sort((a, b) => b.count - a.count || a.value.localeCompare(b.value));
}

function buildReadinessQueue(records: StayRecord[]): ReadinessItem[] {
  return records
    .map((record) => evaluateReadiness(record))
    .sort((a, b) => a.score - b.score || a.name.localeCompare(b.name));
}

function evaluateReadiness(record: StayRecord): ReadinessItem {
  let score = 100;
  const issues: string[] = [];

  if (!record.officialUrl || record.officialUrl.trim().length === 0) {
    score -= 25;
    issues.push("Missing official URL");
  }

  if (!record.bookingUrl || record.bookingUrl.trim().length === 0) {
    score -= 8;
    issues.push("Missing booking URL");
  }

  if (record.sourceLinks.length < 2) {
    score -= 20;
    issues.push("Too few source links");
  } else if (record.sourceLinks.length === 2) {
    score -= 10;
    issues.push("Source coverage is still thin");
  }

  if (record.momentumInputs?.sourceDepth === "thin") {
    score -= 15;
    issues.push("Momentum source depth is thin");
  }

  if (!record.editorialNotes || record.editorialNotes.length === 0) {
    score -= 15;
    issues.push("Missing editorial notes");
  }

  if (record.trust === "low") {
    score -= 20;
    issues.push("Trust is low");
  } else if (record.trust === "medium") {
    score -= 8;
  }

  if (record.momentum === "insufficient") {
    score -= 15;
    issues.push("Momentum is insufficient");
  } else if (record.momentum === "cooling") {
    score -= 5;
  }

  score = Math.max(0, Math.min(100, score));

  return {
    slug: record.slug,
    name: record.name,
    score,
    label: toReadinessLabel(score),
    issues,
    recommendedAction: buildRecommendedAction(record, issues),
  };
}

function toReadinessLabel(score: number): ReadinessItem["label"] {
  if (score >= 85) return "Ready";
  if (score >= 65) return "Usable";
  if (score >= 45) return "Needs work";
  return "Fragile";
}

function buildRecommendedAction(
  record: StayRecord,
  issues: string[]
): string {
  if (!record.officialUrl || record.officialUrl.trim().length === 0) {
    return "Add a reliable official URL first. This is the highest-value fix.";
  }

  if (record.sourceLinks.length < 2 || record.momentumInputs?.sourceDepth === "thin") {
    return "Strengthen source coverage so the signal can be justified more confidently.";
  }

  if (!record.editorialNotes || record.editorialNotes.length === 0) {
    return "Add editorial notes to clarify why this stay belongs in the dataset.";
  }

  if (record.trust === "low" || record.momentum === "insufficient") {
    return "Reassess evidence and either improve support or keep this stay explicitly in watch mode.";
  }

  if (issues.length === 0) {
    return "No urgent action required.";
  }

  return "Review this entry and tighten its supporting rationale.";
}