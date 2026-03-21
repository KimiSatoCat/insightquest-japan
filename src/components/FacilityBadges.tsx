import type { FitTag, MomentumLabel, TierLevel, TrustLevel } from "../lib/types";
import { FIT_TAG_LABELS, TIER_LABELS, TRUST_LABELS } from "../lib/types";

const MOMENTUM_DISPLAY: Record<
  MomentumLabel,
  { text: string; className: string }
> = {
  rising: { text: "Rising", className: "badge badge-rising" },
  steady: { text: "Steady", className: "badge badge-steady" },
  cooling: { text: "Cooling", className: "badge badge-cooling" },
  insufficient: {
    text: "Insufficient data",
    className: "badge badge-insufficient",
  },
};

const TRUST_DISPLAY: Record<TrustLevel, string> = {
  high: "badge badge-trust-high",
  medium: "badge badge-trust-medium",
  low: "badge badge-trust-low",
};

const TIER_DISPLAY: Record<TierLevel, string> = {
  core: "badge badge-tier-core",
  watchlist: "badge badge-tier-watchlist",
  unlisted: "badge badge-tier-unlisted",
};

export function MomentumBadge({ label }: { label: MomentumLabel }) {
  const cfg = MOMENTUM_DISPLAY[label];
  return <span className={cfg.className}>{cfg.text}</span>;
}

export function TrustBadge({ level }: { level: TrustLevel }) {
  return <span className={TRUST_DISPLAY[level]}>{TRUST_LABELS[level]}</span>;
}

export function TierBadge({ level }: { level: TierLevel }) {
  return <span className={TIER_DISPLAY[level]}>{TIER_LABELS[level]}</span>;
}

export function FitTagList({
  tags,
  max,
}: {
  tags: FitTag[];
  max?: number;
}) {
  const shown = max ? tags.slice(0, max) : tags;
  const remaining = max && tags.length > max ? tags.length - max : 0;

  return (
    <span className="badge-row">
      {shown.map((tag) => (
        <span key={tag} className="badge badge-fit">
          {FIT_TAG_LABELS[tag]}
        </span>
      ))}
      {remaining > 0 && <span className="badge-fit-overflow">+{remaining}</span>}
    </span>
  );
}