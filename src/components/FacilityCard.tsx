import type { Facility, MomentumEntry } from "../lib/types";
import { REGION_LABELS, STAY_TYPE_LABELS } from "../lib/types";
import {
  FitTagList,
  MomentumBadge,
  TierBadge,
  TrustBadge,
} from "./FacilityBadges";
import FacilityDetailPanel from "./FacilityDetailPanel";

interface FacilityCardProps {
  facility: Facility;
  momentumEntry: MomentumEntry | undefined;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FacilityCard({
  facility,
  momentumEntry,
  isOpen,
  onToggle,
}: FacilityCardProps) {
  const momentumLabel = momentumEntry?.label ?? "insufficient";

  return (
    <div className="facility-card" data-open={isOpen ? "true" : undefined}>
      <button
        type="button"
        className="facility-card-header"
        onClick={onToggle}
      >
        <div>
          <div className="facility-card-name">{facility.name}</div>
          <div className="facility-meta">
            <span>{REGION_LABELS[facility.region]}</span>
            <span className="facility-meta-sep">·</span>
            <span>{STAY_TYPE_LABELS[facility.stayType]}</span>
          </div>
        </div>

        <div className="facility-card-right">
          <TierBadge level={facility.tierLevel} />
          <MomentumBadge label={momentumLabel} />
          <TrustBadge level={facility.trustLevel} />
          <FitTagList tags={facility.fitTags} max={2} />
          <span
            className="facility-card-chevron"
            data-open={isOpen ? "true" : undefined}
          >
            ▾
          </span>
        </div>
      </button>

      {isOpen && (
        <FacilityDetailPanel
          facility={facility}
          momentumEntry={momentumEntry}
        />
      )}
    </div>
  );
}