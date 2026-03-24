import { dummyStayDataSource } from "../data/source";
import type { StayRecord } from "../types";

export async function getAllStays(): Promise<StayRecord[]> {
  return dummyStayDataSource.listStays();
}