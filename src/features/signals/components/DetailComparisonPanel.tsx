interface DetailComparisonPanelProps {
  comparison: {
    regionRank: number;
    regionTotal: number;
    sameTypeRank: number;
    sameTypeTotal: number;
    higherPriorityInRegion: number;
    regionLeaderName: string;
    summary: string;
  };
}

export default function DetailComparisonPanel({
  comparison,
}: DetailComparisonPanelProps) {
  return (
    <section className="detail-comparison-section">
      <div className="detail-comparison-head">
        <div>
          <p className="section-kicker">Positioning</p>
          <h2 className="detail-comparison-title">
            How this stay sits in the current stack
          </h2>
        </div>
      </div>

      <div className="detail-comparison-grid">
        <article className="detail-comparison-card">
          <p className="detail-comparison-kicker">Regional rank</p>
          <div className="detail-comparison-value-row">
            <p className="detail-comparison-value">
              {comparison.regionRank}
            </p>
            <p className="detail-comparison-label">
              of {comparison.regionTotal}
            </p>
          </div>
          <p className="detail-comparison-text">
            Position within the current regional slice.
          </p>
        </article>

        <article className="detail-comparison-card">
          <p className="detail-comparison-kicker">Same-type rank</p>
          <div className="detail-comparison-value-row">
            <p className="detail-comparison-value">
              {comparison.sameTypeRank}
            </p>
            <p className="detail-comparison-label">
              of {comparison.sameTypeTotal}
            </p>
          </div>
          <p className="detail-comparison-text">
            Position within the local stay-type group.
          </p>
        </article>

        <article className="detail-comparison-card">
          <p className="detail-comparison-kicker">Ahead in region</p>
          <div className="detail-comparison-value-row">
            <p className="detail-comparison-value">
              {comparison.higherPriorityInRegion}
            </p>
            <p className="detail-comparison-label">entries</p>
          </div>
          <p className="detail-comparison-text">
            {comparison.regionLeaderName} is currently the regional reference point.
          </p>
        </article>
      </div>

      <div className="detail-comparison-summary">
        <p>{comparison.summary}</p>
      </div>
    </section>
  );
}