interface DashboardInsightsProps {
  dominantMomentum: {
    label: string;
    count: number;
    summary: string;
  };
  trustWatch: {
    count: number;
    summary: string;
  };
  fitFocus: {
    label: string;
    count: number;
    summary: string;
  } | null;
}

export default function DashboardInsights({
  dominantMomentum,
  trustWatch,
  fitFocus,
}: DashboardInsightsProps) {
  return (
    <section className="insights-section" aria-label="Current dashboard insights">
      <div className="insights-section-head">
        <div>
          <p className="section-kicker">Reading the board</p>
          <h2 className="insights-heading">What stands out in this slice</h2>
        </div>
      </div>

      <div className="insights-grid">
        <article className="insight-card">
          <p className="insight-kicker">Dominant momentum</p>
          <div className="insight-value-row">
            <p className="insight-value">{dominantMomentum.count}</p>
            <p className="insight-label">{dominantMomentum.label}</p>
          </div>
          <p className="insight-text">{dominantMomentum.summary}</p>
        </article>

        <article className="insight-card">
          <p className="insight-kicker">Confidence watch</p>
          <div className="insight-value-row">
            <p className="insight-value">{trustWatch.count}</p>
            <p className="insight-label">Watch-mode entries</p>
          </div>
          <p className="insight-text">{trustWatch.summary}</p>
        </article>

        <article className="insight-card">
          <p className="insight-kicker">Fit focus</p>
          {fitFocus ? (
            <>
              <div className="insight-value-row">
                <p className="insight-value">{fitFocus.count}</p>
                <p className="insight-label">{fitFocus.label}</p>
              </div>
              <p className="insight-text">{fitFocus.summary}</p>
            </>
          ) : (
            <>
              <div className="insight-value-row">
                <p className="insight-value">0</p>
                <p className="insight-label">No fit theme yet</p>
              </div>
              <p className="insight-text">
                The current result set is too thin to surface a recurring fit pattern.
              </p>
            </>
          )}
        </article>
      </div>
    </section>
  );
}