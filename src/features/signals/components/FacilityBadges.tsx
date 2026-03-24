import type { StayRecord } from "../types";
import {
  getMomentumLabel,
  getMomentumToneClass,
  getTierLabel,
  getTierToneClass,
  getTrustLabel,
  getTrustToneClass,
} from "../lib/momentum";

interface FacilityBadgesProps {
  stay: StayRecord;
}

export default function FacilityBadges({ stay }: FacilityBadgesProps) {
  const visibleFitTags = stay.fitTags.slice(0, 2);
  const overflowCount = Math.max(0, stay.fitTags.length - visibleFitTags.length);

  return (
    <div className="badge-row">
      <span className={`badge ${getMomentumToneClass(stay.momentum)}`}>
        {getMomentumLabel(stay.momentum)}
      </span>

      <span className={`badge ${getTrustToneClass(stay.trust)}`}>
        {getTrustLabel(stay.trust)}
      </span>

      <span className={`badge ${getTierToneClass(stay.tier)}`}>
        {getTierLabel(stay.tier)}
      </span>

      {visibleFitTags.map((tag) => (
        <span key={tag} className="badge badge-fit">
          {tag}
        </span>
      ))}

      {overflowCount > 0 ? (
        <span className="badge-fit-overflow">+{overflowCount} more</span>
      ) : null}
    </div>
  );
}