import Link from "next/link";
import type { Region, StayRecord, StayType } from "../types";
import {
  buildComparePageHref,
  buildSignalsHref,
  removeCompareSlug,
  type PresetKey,
  type SortKey,
} from "../lib/selectors";
import { getRegionLabel, getStayTypeLabel } from "../lib/momentum";
import FacilityBadges from "./FacilityBadges";

interface CompareTrayProps {
  stays: StayRecord[];
  selectedRegion?: Region;
  selectedStayType?: StayType;
  currentQuery?: string;
  currentSort: SortKey;
  currentPreset?: PresetKey;
  currentCompare: string[];
}

function formatPriceBand(value: StayRecord["priceBand"]): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CompareTray({
  stays,
  selectedRegion,
  selectedStayType,
  currentQuery,
  currentSort,
  currentPreset,
  currentCompare,
}: CompareTrayProps) {
  if (stays.length === 0) {
    return null;
  }

  return (
    <section className="compare-section" aria-label="Compare selected stays">
      <div className="compare-head">
        <div>
          <p className="section-kicker">Compare</p>
          <h2 className="compare-title">Read selected stays side by side</h2>
        </div>

        <div className="compare-head-actions">
          <Link
            href={buildComparePageHref(currentCompare)}
            className="compare-clear"
          >
            Open full compare page
          </Link>

          <Link
            href={buildSignalsHref({
              region: selectedRegion,
              stayType: selectedStayType,
              q: currentQuery,
              sort: currentSort,
              preset: currentPreset,
            })}
            className="compare-clear"
          >
            Clear comparison
          </Link>
        </div>
      </div>

      <div className="compare-grid">
        {stays.map((stay) => (
          <article key={stay.id} className="compare-card">
            <p className="compare-meta">
              {getRegionLabel(stay.region)} / {stay.city} / {getStayTypeLabel(stay.stayType)}
            </p>

            <h3 className="compare-card-title">{stay.name}</h3>
            <p className="compare-card-text">{stay.headline}</p>

            <div className="compare-badges">
              <FacilityBadges stay={stay} />
            </div>

            <div className="compare-rows">
              <div className="compare-row">
                <span className="compare-row-label">Price band</span>
                <span className="compare-row-value">{formatPriceBand(stay.priceBand)}</span>
              </div>

              <div className="compare-row">
                <span className="compare-row-label">Last reviewed</span>
                <span className="compare-row-value">{stay.lastReviewedAt}</span>
              </div>

              <div className="compare-row">
                <span className="compare-row-label">Top fit</span>
                <span className="compare-row-value">{stay.fitTags.slice(0, 2).join(" / ")}</span>
              </div>
            </div>

            <div className="compare-actions">
              <Link href={`/signals/${stay.slug}`} className="compare-link">
                Open detail
              </Link>

              <Link
                href={buildSignalsHref({
                  region: selectedRegion,
                  stayType: selectedStayType,
                  q: currentQuery,
                  sort: currentSort,
                  preset: currentPreset,
                  compare: removeCompareSlug(currentCompare, stay.slug),
                })}
                className="compare-link"
              >
                Remove
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}