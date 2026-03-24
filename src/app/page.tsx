import Link from "next/link";

const lensCards = [
  {
    title: "Luxury lens",
    text: "Open a tighter slice of premium villas, ryokan, and higher-comfort stays.",
    href: "/signals?preset=luxury",
  },
  {
    title: "Onsen lens",
    text: "Jump directly into restorative stays and ryokan-style properties with clearer bath-oriented fit.",
    href: "/signals?preset=onsen",
  },
  {
    title: "Design-led lens",
    text: "Surface stays where concept clarity and aesthetic positioning matter more strongly.",
    href: "/signals?preset=design-led",
  },
  {
    title: "Family / Group lens",
    text: "Find options that make more sense for longer stays, groups, or functional layouts.",
    href: "/signals?preset=family",
  },
  {
    title: "Slow travel lens",
    text: "Focus on calmer, scenic, restorative, or route-based stays with a slower travel rhythm.",
    href: "/signals?preset=slow-travel",
  },
];

const capabilityCards = [
  {
    title: "Signals dashboard",
    text: "Filter by region, type, keyword, sort order, and editorial lens in one URL-driven workspace.",
    href: "/signals",
    cta: "Open dashboard",
  },
  {
    title: "Recent updates",
    text: "See which stays were reviewed recently and what editorial changes were made.",
    href: "/signals/updates",
    cta: "Open updates",
  },
  {
    title: "Methodology",
    text: "Read how momentum, trust, tier, featured selection, and review history are interpreted.",
    href: "/signals/methodology",
    cta: "Read methodology",
  },
];

export default function HomePage() {
  return (
    <div className="container">
      <section className="hero hero-home">
        <p className="hero-eyebrow">Japan accommodation intelligence</p>

        <h1 className="hero-title">
          Find the right stay in Japan with clearer editorial signals
        </h1>

        <p className="hero-text">
          Stay Signals is a structured dashboard for reading accommodation options
          beyond surface-level listings. Compare stays by{" "}
          <strong>momentum, trust, traveler fit, and editorial position</strong>{" "}
          so you can narrow choices faster and make cleaner decisions.
        </p>

        <div className="hero-actions hero-actions-row">
          <Link href="/signals" className="btn-primary">
            Open signals dashboard
          </Link>

          <Link href="/signals/updates" className="btn-secondary">
            See recent updates
          </Link>
        </div>

        <p className="hero-note hero-note-home">
          Need context on how the scoring language works?{" "}
          <Link href="/signals/methodology" className="home-inline-link">
            Read the methodology
          </Link>
        </p>

        <div className="hero-metrics">
          <article className="hero-metric-card">
            <p className="hero-metric-value">Filters + lenses</p>
            <p className="hero-metric-text">
              Region, type, keyword, sort, and editorial angle all work together.
            </p>
          </article>

          <article className="hero-metric-card">
            <p className="hero-metric-value">Compare selected stays</p>
            <p className="hero-metric-text">
              Build a short side-by-side set instead of jumping between tabs.
            </p>
          </article>

          <article className="hero-metric-card">
            <p className="hero-metric-value">Review history visible</p>
            <p className="hero-metric-text">
              Recent editorial changes can now be read directly in the product.
            </p>
          </article>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-head">
          <div>
            <p className="section-kicker">Explore faster</p>
            <h2 className="home-section-title">Start from an editorial lens</h2>
          </div>
          <p className="home-section-note">
            These are quick entry points into the same dashboard, already tilted
            toward a specific travel or editorial angle.
          </p>
        </div>

        <div className="home-lens-grid">
          {lensCards.map((card) => (
            <article key={card.title} className="home-lens-card">
              <h3 className="home-lens-title">{card.title}</h3>
              <p className="home-lens-text">{card.text}</p>
              <Link href={card.href} className="home-inline-link">
                Open lens
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="home-section home-section-soft">
        <div className="home-section-head">
          <div>
            <p className="section-kicker">What this prototype already supports</p>
            <h2 className="home-section-title">A more usable evaluation flow</h2>
          </div>
        </div>

        <div className="home-capability-grid">
          {capabilityCards.map((card) => (
            <article key={card.title} className="home-capability-card">
              <h3 className="home-capability-title">{card.title}</h3>
              <p className="home-capability-text">{card.text}</p>
              <Link href={card.href} className="home-inline-link">
                {card.cta}
              </Link>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}