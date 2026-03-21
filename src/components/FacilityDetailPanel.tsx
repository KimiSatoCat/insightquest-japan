import type { Facility, MomentumEntry } from "../lib/types";
import {
  REGION_LABELS,
  STAY_TYPE_LABELS,
  TIER_LABELS,
  TRUST_LABELS,
} from "../lib/types";
import { FitTagList, MomentumBadge } from "./FacilityBadges";

interface FacilityDetailPanelProps {
  facility: Facility;
  momentumEntry: MomentumEntry | undefined;
}

export default function FacilityDetailPanel({
  facility,
  momentumEntry,
}: FacilityDetailPanelProps) {
  const momentumLabel = momentumEntry?.label ?? "insufficient";
  const momentumRationale =
    momentumEntry?.rationale ?? "No momentum data available for this combination.";

  return (
    <div className="detail-panel" data-tier={facility.tierLevel}>
      <p className="detail-watchlist-note">
        This property is on our Watchlist — it has distinctive character but
        limited English-language coverage.
      </p>

      <p className="detail-summary">{facility.summary}</p>

      <div className="detail-momentum-box">
        <div className="detail-momentum-heading">
          <span>
            Momentum — {REGION_LABELS[facility.region]}{" "}
            {STAY_TYPE_LABELS[facility.stayType]}
          </span>
          <MomentumBadge label={momentumLabel} />
        </div>
        <p className="detail-momentum-rationale">{momentumRationale}</p>
      </div>

      <div className="detail-fields">
        <div className="detail-field">
          <span className="detail-field-label">Tier</span>
          <span className="detail-field-value">
            {TIER_LABELS[facility.tierLevel]}
          </span>
        </div>
        <div className="detail-field">
          <span className="detail-field-label">Trust</span>
          <span className="detail-field-value">
            {TRUST_LABELS[facility.trustLevel]}
          </span>
        </div>
        <div className="detail-field">
          <span className="detail-field-label">Location</span>
          <span className="detail-field-value">{facility.location}</span>
        </div>
        <div className="detail-field">
          <span className="detail-field-label">Price</span>
          <span className="detail-field-value">{facility.priceNote}</span>
        </div>
        <div className="detail-field">
          <span className="detail-field-label">Type</span>
          <span className="detail-field-value">
            {STAY_TYPE_LABELS[facility.stayType]}
          </span>
        </div>
      </div>

      <div className="detail-fittags">
        <div className="detail-fittags-label">Fit</div>
        <FitTagList tags={facility.fitTags} />
      </div>

      {facility.externalUrl && (
        <div className="detail-links">
          <a
            href={facility.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="detail-ext-link"
          >
            Official website
            <span className="detail-ext-link-icon">↗</span>
          </a>
        </div>
      )}
    </div>
  );
}