import type { StayRecord } from "../types";
import { getRegionLabel, getStayTypeLabel } from "../lib/momentum";
import FacilityBadges from "./FacilityBadges";
import FacilityDetailPanel from "./FacilityDetailPanel";

interface FacilityCardProps {
  stay: StayRecord;
  compareHref: string;
  isCompared: boolean;
}

export default function FacilityCard({
  stay,
  compareHref,
  isCompared,
}: FacilityCardProps) {
  return (
    <details className="facility-card" id={stay.slug}>
      <summary className="facility-card-header">
        <div>
          <p className="facility-card-name">{stay.name}</p>

          <div className="facility-meta">
            <span>{getRegionLabel(stay.region)}</span>
            <span className="facility-meta-sep">•</span>
            <span>{stay.city}</span>
            <span className="facility-meta-sep">•</span>
            <span>{getStayTypeLabel(stay.stayType)}</span>
          </div>
        </div>

        <div className="facility-card-right">
          <FacilityBadges stay={stay} />
          <span className="facility-card-chevron">⌄</span>
        </div>
      </summary>

      <FacilityDetailPanel
        stay={stay}
        compareHref={compareHref}
        isCompared={isCompared}
      />
    </details>
  );
}