import Link from "next/link";
import type { StayRecord } from "../types";
import FacilityBadges from "./FacilityBadges";
import { getRegionLabel, getStayTypeLabel } from "../lib/momentum";

interface CompareMatrixProps {
  stays: StayRecord[];
  leadName?: string;
  commonFitTags: string[];
  summary: string;
}

function formatPriceBand(value: StayRecord["priceBand"]): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function CompareMatrix({
  stays,
  leadName,
  commonFitTags,
  summary,
}: CompareMatrixProps) {
  return (
    <section className="compare-page-section">
      <div className="compare-page-head">
        <div>
          <p className="section-kicker">Full compare</p>
          <h1 className="compare-page-title">Selected stays, side by side</h1>
        </div>
      </div>

      <div className="compare-page-summary">
        <p>{summary}</p>
      </div>

      {commonFitTags.length > 0 ? (
        <div className="compare-page-common">
          <p className="compare-page-common-label">Shared fit</p>
          <div className="stay-chip-row">
            {commonFitTags.map((tag) => (
              <span key={tag} className="stay-chip stay-chip-soft">
                {tag}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      <div className="compare-page-grid">
        {stays.map((stay, index) => (
          <article key={stay.id} className="compare-page-card">
            {leadName && index === 0 ? (
              <p className="compare-page-lead">Current lead</p>
            ) : null}

            <p className="compare-page-meta">
              {getRegionLabel(stay.region)} / {stay.city} / {getStayTypeLabel(stay.stayType)}
            </p>

            <h2 className="compare-page-card-title">{stay.name}</h2>
            <p className="compare-page-card-text">{stay.headline}</p>

            <div className="compare-page-badges">
              <FacilityBadges stay={stay} />
            </div>

            <div className="compare-page-rows">
              <div className="compare-page-row">
                <span className="compare-page-row-label">Price band</span>
                <span className="compare-page-row-value">{formatPriceBand(stay.priceBand)}</span>
              </div>

              <div className="compare-page-row">
                <span className="compare-page-row-label">Last reviewed</span>
                <span className="compare-page-row-value">{stay.lastReviewedAt}</span>
              </div>

              <div className="compare-page-row">
                <span className="compare-page-row-label">Highlights</span>
                <span className="compare-page-row-value">{stay.highlights.slice(0, 2).join(" / ")}</span>
              </div>

              <div className="compare-page-row">
                <span className="compare-page-row-label">Top fit</span>
                <span className="compare-page-row-value">{stay.fitTags.slice(0, 2).join(" / ")}</span>
              </div>
            </div>

            <div className="compare-page-actions">
              <Link href={`/signals/${stay.slug}`} className="compare-page-link">
                Open detail
              </Link>

              {stay.officialUrl ? (
                <a
                  href={stay.officialUrl}
                  className="compare-page-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  Official site
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}