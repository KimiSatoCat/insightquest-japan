import Link from "next/link";
import { REGION_LABELS, REGIONS, type Region, type StayType } from "../types";
import { buildSignalsHref, type PresetKey, type SortKey } from "../lib/selectors";

interface RegionFilterProps {
  counts: Record<Region, number>;
  totalCount: number;
  selectedRegion?: Region;
  selectedStayType?: StayType;
  currentQuery?: string;
  currentSort: SortKey;
  currentPreset?: PresetKey;
  currentCompare: string[];
}

export default function RegionFilter({
  counts,
  totalCount,
  selectedRegion,
  selectedStayType,
  currentQuery,
  currentSort,
  currentPreset,
  currentCompare,
}: RegionFilterProps) {
  return (
    <div className="filters-block">
      <p className="filter-label">Region</p>
      <div className="filter-row">
        <Link
          href={buildSignalsHref({
            stayType: selectedStayType,
            q: currentQuery,
            sort: currentSort,
            preset: currentPreset,
            compare: currentCompare,
          })}
          className="filter-chip"
          data-active={selectedRegion == null}
        >
          All regions ({totalCount})
        </Link>

        {REGIONS.map((region) => (
          <Link
            key={region}
            href={buildSignalsHref({
              region,
              stayType: selectedStayType,
              q: currentQuery,
              sort: currentSort,
              preset: currentPreset,
              compare: currentCompare,
            })}
            className="filter-chip"
            data-active={selectedRegion === region}
          >
            {REGION_LABELS[region]} ({counts[region]})
          </Link>
        ))}
      </div>
    </div>
  );
}