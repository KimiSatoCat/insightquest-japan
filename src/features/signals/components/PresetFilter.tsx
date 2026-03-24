import Link from "next/link";
import type { Region, StayType } from "../types";
import {
  PRESET_KEYS,
  buildSignalsHref,
  getPresetLabel,
  type PresetKey,
  type SortKey,
} from "../lib/selectors";

interface PresetFilterProps {
  counts: Record<PresetKey, number>;
  totalCount: number;
  selectedRegion?: Region;
  selectedStayType?: StayType;
  selectedPreset?: PresetKey;
  currentQuery?: string;
  currentSort: SortKey;
  currentCompare: string[];
}

export default function PresetFilter({
  counts,
  totalCount,
  selectedRegion,
  selectedStayType,
  selectedPreset,
  currentQuery,
  currentSort,
  currentCompare,
}: PresetFilterProps) {
  return (
    <div className="filters-block preset-block">
      <div className="preset-head">
        <p className="filter-label">Editorial lens</p>
        <p className="preset-note">
          A faster way to switch the board into a traveler or editorial angle.
        </p>
      </div>

      <div className="filter-row">
        <Link
          href={buildSignalsHref({
            region: selectedRegion,
            stayType: selectedStayType,
            q: currentQuery,
            sort: currentSort,
            compare: currentCompare,
          })}
          className="filter-chip"
          data-active={selectedPreset == null}
        >
          All lenses ({totalCount})
        </Link>

        {PRESET_KEYS.map((preset) => (
          <Link
            key={preset}
            href={buildSignalsHref({
              region: selectedRegion,
              stayType: selectedStayType,
              q: currentQuery,
              sort: currentSort,
              preset,
              compare: currentCompare,
            })}
            className="filter-chip"
            data-active={selectedPreset === preset}
          >
            {getPresetLabel(preset)} ({counts[preset]})
          </Link>
        ))}
      </div>
    </div>
  );
}