import WorkflowStrip from "../../../features/signals/components/WorkflowStrip";
import { WORKFLOW_STRIP_PRESETS } from "../../../features/signals/config/workflowStripPresets";
import type { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: "Methodology | Stay Signals",
  description:
    "How Stay Signals interprets momentum, trust, tier, traveler fit, lenses, and review history.",
};

const signalCards = [
  {
    title: "Momentum",
    text: "Momentum is an editorial direction signal. It reflects whether a stay currently reads as rising, stable, cooling, or still too thin to call.",
  },
  {
    title: "Trust",
    text: "Trust reflects evidence quality, not attractiveness. A beautiful stay can still be medium or low trust if the supporting material is weak.",
  },
  {
    title: "Tier",
    text: "Tier shows placement in the editorial stack. Core entries lead the board, watchlist entries remain useful but secondary, and unlisted entries are weak or incomplete.",
  },
];

const readingCards = [
  {
    title: "Featured",
    text: "Featured cards are selected from the current slice after filters and lensing. They are not random; they are chosen to surface stronger or more representative entries.",
  },
  {
    title: "Fit tags",
    text: "Fit tags describe who a stay makes sense for. They are meant to be compared across entries rather than read as promotional labels.",
  },
  {
    title: "Review history",
    text: "Review history shows how an entry changed over time. It helps distinguish a living editorial dataset from a static catalog.",
  },
];

const governanceCards = [
  {
    title: "Lenses",
    text: "Lenses are editorial shortcuts. They do not replace filters, but they quickly tilt the board toward a coherent traveler or evaluative angle.",
  },
  {
    title: "Comparison",
    text: "Comparison is intended to reduce tab-hopping. It helps determine which stay is currently stronger in the selected set, and where the real tradeoffs are.",
  },
  {
    title: "Admin",
    text: "The admin area is for maintaining consistency. It highlights weak evidence, missing notes, duplication risk, and editing priority.",
  },
];

export default function SignalsMethodologyPage() {
  return (
    <div className="container">
                        <WorkflowStrip {...WORKFLOW_STRIP_PRESETS.methodology} />

      <section className="method-shell">
        <div className="stay-detail-breadcrumbs">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/signals">Signals</Link>
          <span> / </span>
          <span>Methodology</span>
        </div>

        <div className="method-hero">
          <div>
            <p className="section-kicker">Methodology</p>
            <h1 className="method-title">How the signals are meant to be read</h1>
            <p className="method-subtitle">
              Stay Signals is not a booking engine and not a raw listing dump.
              It is an editorial evaluation layer designed to make accommodation
              choices easier to compare, easier to explain, and easier to revise.
            </p>
          </div>

          <div className="method-actions">
            <Link href="/signals" className="btn-primary">
              Open dashboard
            </Link>
            <Link href="/signals/updates" className="btn-secondary">
              See recent updates
            </Link>
          </div>
        </div>

        <section className="method-section">
          <div className="method-section-head">
            <div>
              <p className="section-kicker">Core axes</p>
              <h2 className="method-section-title">The three main signals</h2>
            </div>
          </div>

          <div className="method-grid">
            {signalCards.map((card) => (
              <article key={card.title} className="method-card">
                <h3 className="method-card-title">{card.title}</h3>
                <p className="method-card-text">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="method-section">
          <div className="method-section-head">
            <div>
              <p className="section-kicker">Reading flow</p>
              <h2 className="method-section-title">How to interpret the board</h2>
            </div>
          </div>

          <div className="method-grid">
            {readingCards.map((card) => (
              <article key={card.title} className="method-card">
                <h3 className="method-card-title">{card.title}</h3>
                <p className="method-card-text">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="method-section">
          <div className="method-section-head">
            <div>
              <p className="section-kicker">System behavior</p>
              <h2 className="method-section-title">Why the product is structured this way</h2>
            </div>
          </div>

          <div className="method-grid">
            {governanceCards.map((card) => (
              <article key={card.title} className="method-card">
                <h3 className="method-card-title">{card.title}</h3>
                <p className="method-card-text">{card.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="method-section method-section-dark">
          <div className="method-section-head">
            <div>
              <p className="section-kicker">Practical reading order</p>
              <h2 className="method-section-title">A simple way to use the system</h2>
            </div>
          </div>

          <div className="method-steps">
            <div className="method-step">
              <span className="method-step-mark">01</span>
              <p className="method-step-text">
                Start with a region, stay type, or lens to reduce the board to a
                coherent slice.
              </p>
            </div>

            <div className="method-step">
              <span className="method-step-mark">02</span>
              <p className="method-step-text">
                Read the overview and insights first so you understand what kind
                of slice you are looking at.
              </p>
            </div>

            <div className="method-step">
              <span className="method-step-mark">03</span>
              <p className="method-step-text">
                Open detail pages for the strongest candidates, then use compare
                to test actual tradeoffs.
              </p>
            </div>

            <div className="method-step">
              <span className="method-step-mark">04</span>
              <p className="method-step-text">
                Use updates and review history when you need to understand what
                changed and whether a current judgment is stable.
              </p>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}