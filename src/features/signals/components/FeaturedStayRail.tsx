import Link from "next/link";
import type { Region, StayRecord, StayType } from "../types";
import {
  addCompareSlug,
  buildSignalsHref,
  removeCompareSlug,
  type PresetKey,
  type SortKey,
} from "../lib/selectors";
import { getRegionLabel, getStayTypeLabel } from "../lib/momentum";
import FacilityBadges from "./FacilityBadges";

interface FeaturedStayRailProps {
  stays: StayRecord[];
  selectedRegion?: Region;
  selectedStayType?: StayType;
  currentQuery?: string;
  currentSort: SortKey;
  currentPreset?: PresetKey;
  currentCompare: string[];
}

export default function FeaturedStayRail({
  stays,
  selectedRegion,
  selectedStayType,
  currentQuery,
  currentSort,
  currentPreset,
  currentCompare,
}: FeaturedStayRailProps) {
  if (stays.length === 0) {
    return null;
  }

  return (
    <section className="featured-section" aria-label="Featured stays">
      <div className="featured-section-head">
        <div>
          <p className="section-kicker">Featured now</p>
          <h2 className="featured-heading">A short list worth opening first</h2>
        </div>
        <p className="featured-caption">
          Prioritized from the current filtered set.
        </p>
      </div>

      <div className="featured-grid">
        {stays.map((stay) => {
          const isCompared = currentCompare.includes(stay.slug);
          const compareHref = buildSignalsHref({
            region: selectedRegion,
            stayType: selectedStayType,
            q: currentQuery,
            sort: currentSort,
            preset: currentPreset,
            compare: isCompared
              ? removeCompareSlug(currentCompare, stay.slug)
              : addCompareSlug(currentCompare, stay.slug),
          });

          return (
            <article key={stay.id} className="featured-card featured-card-clickable">
              <Link
                href={`/signals/${stay.slug}`}
                className="featured-card-hitarea"
                aria-label={`Open stay detail for ${stay.name}`}
              />

              <div className="featured-card-body">
                <p className="featured-meta">
                  {getRegionLabel(stay.region)} / {stay.city} / {getStayTypeLabel(stay.stayType)}
                </p>

                <h3 className="featured-card-title">{stay.name}</h3>
                <p className="featured-card-text">{stay.headline}</p>

                <div className="featured-badges">
                  <FacilityBadges stay={stay} />
                </div>
              </div>

              <div className="featured-actions">
                <span className="featured-card-hint">Card opens detail</span>

                <Link href={compareHref} className="featured-card-link featured-card-link-action">
                  {isCompared ? "Remove compare" : "Add compare"}
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}