import type { Region } from "../lib/types";
import { REGION_LABELS } from "../lib/types";

interface RegionFilterProps {
  selectedRegion: Region | "all";
  onChange: (region: Region | "all") => void;
}

const ALL_REGIONS = Object.keys(REGION_LABELS) as Region[];

export default function RegionFilter({
  selectedRegion,
  onChange,
}: RegionFilterProps) {
  return (
    <div className="filter-row">
      <button
        type="button"
        className="filter-chip"
        data-active={selectedRegion === "all" ? "true" : undefined}
        onClick={() => onChange("all")}
      >
        All regions
      </button>

      {ALL_REGIONS.map((region) => (
        <button
          key={region}
          type="button"
          className="filter-chip"
          data-active={selectedRegion === region ? "true" : undefined}
          onClick={() => onChange(region)}
        >
          {REGION_LABELS[region]}
        </button>
      ))}
    </div>
  );
}
