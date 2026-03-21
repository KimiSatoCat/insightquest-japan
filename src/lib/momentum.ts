import type { MomentumEntry, Region, StayType } from "./types";

export function findMomentum(
  entries: MomentumEntry[],
  region: Region,
  stayType: StayType
): MomentumEntry | undefined {
  return entries.find(
    (entry) => entry.region === region && entry.stayType === stayType
  );
}
