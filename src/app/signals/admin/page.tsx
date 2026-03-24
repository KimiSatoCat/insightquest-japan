import type { Metadata } from "next";
import Link from "next/link";
import { REGION_LABELS, STAY_TYPE_LABELS, REGIONS, STAY_TYPES } from "../../../features/signals/types";
import { getSignalsDataHealthReport } from "../../../features/signals/lib/dataHealth";

export const metadata: Metadata = {
  title: "Signals data health | Stay Signals",
  description:
    "Internal data quality view for the Stay Signals prototype dataset.",
};

function formatGeneratedAt(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function SignalsAdminPage() {
  const report = await getSignalsDataHealthReport();

  const summaryCards = [
    {
      label: "Total stays",
      value: report.totalStays,
      note: "Current records loaded from JSON",
    },
    {
      label: "Duplicate slug groups",
      value: report.summary.duplicateSlugGroups,
      note: "Should remain zero",
    },
    {
      label: "Thin evidence",
      value: report.summary.thinEvidenceCount,
      note: "Entries with weaker support",
    },
    {
      label: "Low confidence",
      value: report.summary.lowConfidenceCount,
      note: "Low trust or insufficient momentum",
    },
  ];

  return (
    <div className="container">
      <section className="admin-shell">
        <div className="stay-detail-breadcrumbs">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/signals">Signals</Link>
          <span> / </span>
          <span>Admin</span>
        </div>

        <div className="admin-head">
          <div>
            <p className="section-kicker">Internal view</p>
            <h1 className="admin-title">Signals data health</h1>
            <p className="admin-subtitle">
              A maintenance view for checking coverage, duplication risk, weaker
              evidence, and which entries deserve attention first.
            </p>
          </div>

          <div className="admin-head-actions">
            <Link href="/signals/admin/guide" className="btn-secondary">
              Open editing guide
            </Link>
            <Link href="/signals" className="btn-secondary">
              Back to dashboard
            </Link>
          </div>
        </div>

        <p className="admin-timestamp">
          Generated at {formatGeneratedAt(report.generatedAt)}
        </p>

        <div className="overview-grid">
          {summaryCards.map((item) => (
            <article key={item.label} className="overview-card">
              <p className="overview-label">{item.label}</p>
              <p className="overview-value">{item.value}</p>
              <p className="overview-note">{item.note}</p>
            </article>
          ))}
        </div>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Action queue</p>
              <h2 className="admin-section-title">Which stays to fix first</h2>
            </div>
          </div>

          <div className="admin-readiness-grid">
            {report.readinessQueue.map((item) => (
              <article key={item.slug} className="admin-readiness-card">
                <div className="admin-readiness-top">
                  <div>
                    <p className="admin-readiness-name">{item.name}</p>
                    <p className="admin-readiness-slug">/{item.slug}</p>
                  </div>

                  <div className="admin-readiness-score-wrap">
                    <p className="admin-readiness-score">{item.score}</p>
                    <p className="admin-readiness-label">{item.label}</p>
                  </div>
                </div>

                <div className="admin-readiness-issues">
                  {item.issues.length > 0 ? (
                    item.issues.map((issue) => (
                      <span key={issue} className="admin-readiness-chip">
                        {issue}
                      </span>
                    ))
                  ) : (
                    <span className="admin-readiness-chip admin-readiness-chip-ok">
                      No major issues
                    </span>
                  )}
                </div>

                <p className="admin-readiness-action">{item.recommendedAction}</p>

                <div className="admin-readiness-links">
                  <Link href={`/signals/${item.slug}`} className="admin-inline-link">
                    Open detail
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Coverage</p>
              <h2 className="admin-section-title">Regional and type distribution</h2>
            </div>
          </div>

          <div className="admin-coverage-grid">
            <article className="admin-card">
              <h3 className="admin-card-title">By region</h3>
              <div className="admin-metric-list">
                {REGIONS.map((region) => (
                  <div key={region} className="admin-metric-row">
                    <span className="admin-metric-label">{REGION_LABELS[region]}</span>
                    <span className="admin-metric-value">
                      {report.coverageByRegion[region]}
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">By stay type</h3>
              <div className="admin-metric-list">
                {STAY_TYPES.map((stayType) => (
                  <div key={stayType} className="admin-metric-row">
                    <span className="admin-metric-label">{STAY_TYPE_LABELS[stayType]}</span>
                    <span className="admin-metric-value">
                      {report.coverageByType[stayType]}
                    </span>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Issue buckets</p>
              <h2 className="admin-section-title">What needs attention</h2>
            </div>
          </div>

          <div className="admin-issues-grid">
            <article className="admin-card">
              <h3 className="admin-card-title">Duplicate slugs</h3>
              {report.issues.duplicateSlugs.length > 0 ? (
                <div className="admin-list">
                  {report.issues.duplicateSlugs.map((item) => (
                    <div key={item.value} className="admin-list-item">
                      <p className="admin-list-title">{item.value}</p>
                      <p className="admin-list-note">
                        {item.count} entries / {item.slugs.join(", ")}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-empty">No duplicate slugs detected.</p>
              )}
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">Missing official URLs</h3>
              {report.issues.missingOfficialUrl.length > 0 ? (
                <div className="admin-list">
                  {report.issues.missingOfficialUrl.map((item) => (
                    <div key={item.slug} className="admin-list-item">
                      <p className="admin-list-title">{item.name}</p>
                      <p className="admin-list-note">{item.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-empty">All stays have an official URL.</p>
              )}
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">Thin evidence</h3>
              {report.issues.thinEvidence.length > 0 ? (
                <div className="admin-list">
                  {report.issues.thinEvidence.map((item) => (
                    <div key={item.slug} className="admin-list-item">
                      <p className="admin-list-title">{item.name}</p>
                      <p className="admin-list-note">{item.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-empty">No thin-evidence entries found.</p>
              )}
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">Missing editorial notes</h3>
              {report.issues.missingEditorialNotes.length > 0 ? (
                <div className="admin-list">
                  {report.issues.missingEditorialNotes.map((item) => (
                    <div key={item.slug} className="admin-list-item">
                      <p className="admin-list-title">{item.name}</p>
                      <p className="admin-list-note">{item.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-empty">All stays include editorial notes.</p>
              )}
            </article>

            <article className="admin-card admin-card-wide">
              <h3 className="admin-card-title">Low confidence entries</h3>
              {report.issues.lowConfidence.length > 0 ? (
                <div className="admin-list">
                  {report.issues.lowConfidence.map((item) => (
                    <div key={item.slug} className="admin-list-item">
                      <p className="admin-list-title">{item.name}</p>
                      <p className="admin-list-note">{item.note}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="admin-empty">No low-confidence entries detected.</p>
              )}
            </article>
          </div>
        </section>
      </section>
    </div>
  );
}