import Link from "next/link";
import type { StayRecord } from "../types";
import { getRegionLabel, getStayTypeLabel } from "../lib/momentum";
import BookmarkButton from "./BookmarkButton";

interface FacilityDetailPanelProps {
  stay: StayRecord;
  compareHref: string;
  isCompared: boolean;
}

function formatPriceBand(value: StayRecord["priceBand"]): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function FacilityDetailPanel({
  stay,
  compareHref,
  isCompared,
}: FacilityDetailPanelProps) {
  return (
    <div className="detail-panel" data-tier={stay.tier}>
      <p className="detail-watchlist-note">
        Watchlist entry — useful to monitor, but not a lead recommendation yet.
      </p>

      {stay.heroNote ? <p className="detail-summary">{stay.heroNote}</p> : null}
      <p className="detail-summary">{stay.summary}</p>

      <div className="detail-momentum-box">
        <p className="detail-momentum-heading">Why this signal</p>
        <p className="detail-momentum-rationale">{stay.momentumRationale}</p>
      </div>

      <div className="detail-fields">
        <div className="detail-field">
          <span className="detail-field-label">Region</span>
          <span className="detail-field-value">
            {getRegionLabel(stay.region)} / {stay.city}
          </span>
        </div>

        <div className="detail-field">
          <span className="detail-field-label">Stay type</span>
          <span className="detail-field-value">{getStayTypeLabel(stay.stayType)}</span>
        </div>

        <div className="detail-field">
          <span className="detail-field-label">Price band</span>
          <span className="detail-field-value">{formatPriceBand(stay.priceBand)}</span>
        </div>

        <div className="detail-field">
          <span className="detail-field-label">Last reviewed</span>
          <span className="detail-field-value">{stay.lastReviewedAt}</span>
        </div>
      </div>

      <div className="detail-highlight-strip">
        {stay.highlights.join(" · ")}
      </div>

      <div className="detail-fittags">
        <p className="detail-fittags-label">Best fit</p>
        <div className="badge-row">
          {stay.fitTags.map((tag) => (
            <span key={tag} className="badge badge-fit">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="detail-actions">
        <Link href={`/signals/${stay.slug}`} className="detail-primary-link">
          Open full detail page
        </Link>

        <Link href={compareHref} className="detail-primary-link">
          {isCompared ? "Remove from compare" : "Add to compare"}
        </Link>

        <BookmarkButton slug={stay.slug} compact />
      </div>

      <div className="detail-links">
        {stay.sourceLinks.map((link) => (
          <a
            key={`${stay.id}-${link.label}`}
            href={link.url}
            className="detail-ext-link"
            target="_blank"
            rel="noreferrer"
          >
            <span>{link.label}</span>
            <span className="detail-ext-link-icon">↗</span>
          </a>
        ))}
      </div>
    </div>
  );
}