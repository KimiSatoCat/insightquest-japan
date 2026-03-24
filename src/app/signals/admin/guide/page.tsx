import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signals editing guide | Stay Signals",
  description:
    "Internal guide for editing and maintaining the Stay Signals JSON dataset.",
};

const sampleRecord = `{
  "id": "stay-kansai-003",
  "slug": "osaka-river-stay",
  "name": "Osaka River Stay",
  "region": "kansai",
  "city": "Osaka",
  "stayType": "hotel",
  "priceBand": "mid",
  "headline": "A compact city stay with stable utility.",
  "summary": "A practical stay suited to travelers who want strong access and clear editorial positioning.",
  "heroNote": "A sensible Osaka base for shorter urban trips.",
  "fitTags": ["City break", "Couples", "Transit-friendly"],
  "highlights": ["Central access", "Clear utility", "Stable value"],
  "momentum": "steady",
  "momentumRationale": "The current signal pattern suggests stable relevance rather than acceleration.",
  "trust": "medium",
  "trustRationale": "The stay has enough source depth for publication, but not yet for a high-trust label.",
  "tier": "watchlist",
  "tierRationale": "Worth keeping visible, but not yet a lead entry.",
  "lastReviewedAt": "2026-03-21",
  "officialUrl": "https://example.com/osaka-river-stay",
  "bookingUrl": "https://example.com/osaka-river-stay/booking",
  "sourceLinks": [
    {
      "label": "Osaka River Stay Official",
      "url": "https://example.com/osaka-river-stay",
      "kind": "official"
    },
    {
      "label": "Osaka River Stay Booking",
      "url": "https://example.com/osaka-river-stay/booking",
      "kind": "booking"
    }
  ],
  "momentumInputs": {
    "recentCoverageLevel": "medium",
    "bookingInterestSignal": "moderate",
    "listingFreshness": "recent",
    "seasonalAttention": "medium",
    "sourceDepth": "moderate"
  },
  "editorialNotes": [
    "Useful comparison point for Osaka urban stays."
  ]
}`;

export default function SignalsAdminGuidePage() {
  return (
    <div className="container">
      <section className="admin-guide-shell">
        <div className="stay-detail-breadcrumbs">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/signals">Signals</Link>
          <span> / </span>
          <Link href="/signals/admin">Admin</Link>
          <span> / </span>
          <span>Guide</span>
        </div>

        <div className="admin-head">
          <div>
            <p className="section-kicker">Internal guide</p>
            <h1 className="admin-title">Signals JSON editing guide</h1>
            <p className="admin-subtitle">
              This page defines how to write, review, and maintain entries in
              <code className="admin-inline-code"> stays.json </code>
              so the dataset remains consistent.
            </p>
          </div>

          <div className="admin-head-actions">
            <Link href="/signals/admin" className="btn-secondary">
              Back to admin
            </Link>
          </div>
        </div>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Principles</p>
              <h2 className="admin-section-title">How entries should be written</h2>
            </div>
          </div>

          <div className="admin-guide-grid">
            <article className="admin-card">
              <h3 className="admin-card-title">Keep claims proportional</h3>
              <p className="admin-guide-text">
                Strong language should only be used when source coverage and editorial
                confidence are strong enough to support it.
              </p>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">Separate fact and judgment</h3>
              <p className="admin-guide-text">
                Use summary fields to explain the stay clearly, and rationale fields to
                explain why a momentum, trust, or tier label was assigned.
              </p>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">Prefer useful clarity over hype</h3>
              <p className="admin-guide-text">
                The product should read like a calm editorial dashboard, not like
                promotional copy.
              </p>
            </article>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Checklist</p>
              <h2 className="admin-section-title">What must be true before saving</h2>
            </div>
          </div>

          <div className="admin-guide-checklist">
            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">01</span>
              <p className="admin-guide-check-text">
                <strong>id</strong> and <strong>slug</strong> must be unique.
              </p>
            </div>

            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">02</span>
              <p className="admin-guide-check-text">
                <strong>officialUrl</strong> should be present whenever possible.
              </p>
            </div>

            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">03</span>
              <p className="admin-guide-check-text">
                <strong>sourceLinks</strong> should usually contain at least two sources.
              </p>
            </div>

            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">04</span>
              <p className="admin-guide-check-text">
                <strong>momentumRationale</strong>, <strong>trustRationale</strong>, and
                <strong> tierRationale</strong> should explain the assigned labels plainly.
              </p>
            </div>

            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">05</span>
              <p className="admin-guide-check-text">
                <strong>editorialNotes</strong> should exist for entries that need extra context.
              </p>
            </div>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Field guidance</p>
              <h2 className="admin-section-title">How to think about the main fields</h2>
            </div>
          </div>

          <div className="admin-guide-grid">
            <article className="admin-card">
              <h3 className="admin-card-title">headline</h3>
              <p className="admin-guide-text">
                One sentence. It should describe the stay’s role, not repeat the full summary.
              </p>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">summary</h3>
              <p className="admin-guide-text">
                Two sentences at most. Explain who it fits and why it matters.
              </p>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">fitTags</h3>
              <p className="admin-guide-text">
                Short traveler-fit labels. These should be comparable across entries.
              </p>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">momentum</h3>
              <p className="admin-guide-text">
                Use <strong>rising</strong>, <strong>steady</strong>, <strong>cooling</strong>, or
                <strong> insufficient</strong> only when the rationale supports that level.
              </p>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">trust</h3>
              <p className="admin-guide-text">
                Reflect evidence quality, not how attractive the stay sounds.
              </p>
            </article>

            <article className="admin-card">
              <h3 className="admin-card-title">tier</h3>
              <p className="admin-guide-text">
                Use <strong>core</strong> for lead entries, <strong>watchlist</strong> for usable but secondary
                entries, and <strong>unlisted</strong> for weak or incomplete entries.
              </p>
            </article>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Template</p>
              <h2 className="admin-section-title">Starter example</h2>
            </div>
          </div>

          <div className="admin-guide-code-wrap">
            <pre className="admin-guide-code"><code>{sampleRecord}</code></pre>
          </div>
        </section>

        <section className="admin-section">
          <div className="admin-section-head">
            <div>
              <p className="section-kicker">Workflow</p>
              <h2 className="admin-section-title">Suggested editing order</h2>
            </div>
          </div>

          <div className="admin-guide-checklist">
            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">A</span>
              <p className="admin-guide-check-text">
                Add or revise the JSON entry in <code className="admin-inline-code">stays.json</code>.
              </p>
            </div>

            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">B</span>
              <p className="admin-guide-check-text">
                Open <Link href="/signals/admin" className="admin-inline-link">/signals/admin</Link> and review the readiness queue.
              </p>
            </div>

            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">C</span>
              <p className="admin-guide-check-text">
                Fix missing URLs, weak source depth, or absent editorial notes first.
              </p>
            </div>

            <div className="admin-guide-check">
              <span className="admin-guide-check-mark">D</span>
              <p className="admin-guide-check-text">
                Re-open the stay detail page and confirm that the wording still reads naturally in the UI.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}