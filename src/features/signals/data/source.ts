import { readFile } from "node:fs/promises";
import path from "node:path";
import type { StayRecord } from "../types";
import { parseStayRecordArray } from "./adapter";

export interface StayDataSource {
  listStays(): Promise<StayRecord[]>;
  getStayBySlug(slug: string): Promise<StayRecord | null>;
}

let stayRecordsPromise: Promise<StayRecord[]> | null = null;

async function loadStayRecords(): Promise<StayRecord[]> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "features",
    "signals",
    "data",
    "stays.json"
  );

  const raw = await readFile(filePath, "utf8");
  const parsed: unknown = JSON.parse(raw);
  return parseStayRecordArray(parsed);
}

async function getStayRecords(): Promise<StayRecord[]> {
  if (!stayRecordsPromise) {
    stayRecordsPromise = loadStayRecords();
  }
  return stayRecordsPromise;
}

export const dummyStayDataSource: StayDataSource = {
  async listStays(): Promise<StayRecord[]> {
    return getStayRecords();
  },

  async getStayBySlug(slug: string): Promise<StayRecord | null> {
    const records = await getStayRecords();
    const found = records.find((record) => record.slug === slug);
    return found ?? null;
  },
};