import { dummyStayDataSource } from "../data/source";
import type { ReviewHistoryEntry, StayRecord } from "../types";

export interface StayUpdateItem {
  slug: string;
  name: string;
  region: StayRecord["region"];
  city: string;
  stayType: StayRecord["stayType"];
  date: string;
  change: string;
  editorNote?: string;
}

export async function getRecentStayUpdates(limit = 24): Promise<StayUpdateItem[]> {
  const records = await dummyStayDataSource.listStays();
  const items: StayUpdateItem[] = [];

  for (const record of records) {
    for (const entry of record.reviewHistory ?? []) {
      items.push(toStayUpdateItem(record, entry));
    }
  }

  return items
    .sort((a, b) => {
      const dateDelta = Date.parse(b.date) - Date.parse(a.date);
      if (dateDelta !== 0) {
        return dateDelta;
      }
      return a.name.localeCompare(b.name);
    })
    .slice(0, limit);
}

function toStayUpdateItem(
  record: StayRecord,
  entry: ReviewHistoryEntry
): StayUpdateItem {
  return {
    slug: record.slug,
    name: record.name,
    region: record.region,
    city: record.city,
    stayType: record.stayType,
    date: entry.date,
    change: entry.change,
    editorNote: entry.editorNote,
  };
}