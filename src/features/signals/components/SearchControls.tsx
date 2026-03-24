import type { Region, StayType } from "../types";
import type { PresetKey, SortKey } from "../lib/selectors";

interface SearchControlsProps {
  selectedRegion?: Region;
  selectedStayType?: StayType;
  currentQuery?: string;
  currentSort: SortKey;
  currentPreset?: PresetKey;
  currentCompare: string[];
}

export default function SearchControls({
  selectedRegion,
  selectedStayType,
  currentQuery,
  currentSort,
  currentPreset,
  currentCompare,
}: SearchControlsProps) {
  return (
    <form action="/signals" method="get" className="search-controls">
      {selectedRegion ? <input type="hidden" name="region" value={selectedRegion} /> : null}
      {selectedStayType ? <input type="hidden" name="type" value={selectedStayType} /> : null}
      {currentPreset ? <input type="hidden" name="preset" value={currentPreset} /> : null}
      {currentCompare.length > 0 ? (
        <input type="hidden" name="compare" value={currentCompare.join(",")} />
      ) : null}

      <div className="search-controls-grid">
        <label className="search-field">
          <span className="search-label">Keyword</span>
          <input
            type="text"
            name="q"
            defaultValue={currentQuery ?? ""}
            placeholder="Search by city, stay name, or fit"
            className="search-input"
          />
        </label>

        <label className="search-field">
          <span className="search-label">Sort</span>
          <select
            name="sort"
            defaultValue={currentSort}
            className="search-select"
          >
            <option value="priority">Priority</option>
            <option value="recent">Most recent</option>
            <option value="name">Name</option>
          </select>
        </label>

        <div className="search-submit-wrap">
          <button type="submit" className="btn-primary search-submit">
            Apply
          </button>
        </div>
      </div>
    </form>
  );
}