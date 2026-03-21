import { DUMMY_FACILITIES, DUMMY_MOMENTUM } from "./dummy";
import type { Facility, MomentumEntry } from "./types";

export function getFacilities(): Facility[] {
  return DUMMY_FACILITIES;
}

export function getMomentumEntries(): MomentumEntry[] {
  return DUMMY_MOMENTUM;
}
