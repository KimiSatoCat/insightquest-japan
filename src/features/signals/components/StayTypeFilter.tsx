import Link from "next/link";
import {
  STAY_TYPES,
  STAY_TYPE_LABELS,
  type Region,
  type StayType,
} from "../types";
import { buildSignalsHref, type PresetKey, type SortKey } from "../lib/selectors";

interface StayTypeFilterProps {
  counts: Record<StayType, number>;
  totalCount: number;
  selectedRegion?: Region;
  selectedStayType?: StayType;
  currentQuery?: string;
  currentSort: SortKey;
  currentPreset?: PresetKey;
  currentCompare: string[];
}

export default function StayTypeFilter({
  counts,
  totalCount,
  selectedRegion,
  selectedStayType,
  currentQuery,
  currentSort,
  currentPreset,
  currentCompare,
}: StayTypeFilterProps) {
  return (
    <div className="filters-block">
      <p className="filter-label">Stay type</p>
      <div className="filter-row">
        <Link
          href={buildSignalsHref({
            region: selectedRegion,
            q: currentQuery,
            sort: currentSort,
            preset: currentPreset,
            compare: currentCompare,
          })}
          className="filter-chip"
          data-active={selectedStayType == null}
        >
          All types ({totalCount})
        </Link>

        {STAY_TYPES.map((stayType) => (
          <Link
            key={stayType}
            href={buildSignalsHref({
              region: selectedRegion,
              stayType,
              q: currentQuery,
              sort: currentSort,
              preset: currentPreset,
              compare: currentCompare,
            })}
            className="filter-chip"
            data-active={selectedStayType === stayType}
          >
            {STAY_TYPE_LABELS[stayType]} ({counts[stayType]})
          </Link>
        ))}
      </div>
    </div>
  );
}