import WorkflowStrip from "../../../features/signals/components/WorkflowStrip";
import { WORKFLOW_STRIP_PRESETS } from "../../../features/signals/config/workflowStripPresets";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import BookmarkButton from "../../../features/signals/components/BookmarkButton";
import DetailComparisonPanel from "../../../features/signals/components/DetailComparisonPanel";
import FacilityBadges from "../../../features/signals/components/FacilityBadges";
import ReviewHistoryPanel from "../../../features/signals/components/ReviewHistoryPanel";
import StayNotesEditor from "../../../features/signals/components/StayNotesEditor";
import {  getRegionLabel,
  getStayTypeLabel,
} from "../../../features/signals/lib/momentum";
import {
  getAllStaySlugs,
  getStayDetailBySlug,
  getStayDetailPageData,
} from "../../../features/signals/lib/repository";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatPriceBand(value: string): string {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export async function generateStaticParams() {
  const slugs = await getAllStaySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const stay = await getStayDetailBySlug(slug);

  if (!stay) {
    return {
      title: "Stay not found | Stay Signals",
      description: "The requested stay detail page could not be found.",
    };
  }

  return {
    title: `${stay.name} | Stay Signals`,
    description: stay.headline,
  };
}

export default async function StayDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const detailData = await getStayDetailPageData(slug);

  if (!detailData) {
    notFound();
  }

  const { stay, related, comparison } = detailData;

  return (
    <div className="container">
                  <WorkflowStrip {...WORKFLOW_STRIP_PRESETS.detail} />

      <section className="stay-detail-shell">
        <div className="stay-detail-breadcrumbs">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/signals">Signals</Link>
          <span> / </span>
          <span>{stay.name}</span>
        </div>

        <div className="stay-detail-hero">
          <div className="stay-detail-main">
            <p className="stay-detail-eyebrow">
              {getRegionLabel(stay.region)} / {stay.city} / {getStayTypeLabel(stay.stayType)}
            </p>

            <h1 className="stay-detail-title">{stay.name}</h1>
            <p className="stay-detail-headline">{stay.headline}</p>

            <div className="stay-detail-badges">
              <FacilityBadges stay={stay} />
            </div>

            <p className="stay-detail-summary">{stay.summary}</p>

            <div className="stay-detail-actions">
              <Link href="/signals" className="btn-secondary">
                Back to dashboard
              </Link>

              {stay.officialUrl ? (
                <a
                  href={stay.officialUrl}
                  className="btn-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  Visit official site
                </a>
              ) : null}

              <BookmarkButton slug={stay.slug} />
            </div>
          </div>

          <aside className="stay-detail-side">
            <div className="stay-side-card">
              <p className="stay-side-label">Why it matters now</p>
              <p className="stay-side-text">{stay.momentumRationale}</p>
            </div>

            <div className="stay-side-card">
              <p className="stay-side-label">Trust view</p>
              <p className="stay-side-text">{stay.trustRationale}</p>
            </div>

            <div className="stay-side-card">
              <p className="stay-side-label">Tier rationale</p>
              <p className="stay-side-text">{stay.tierRationale}</p>
            </div>
          </aside>
        </div>

        <DetailComparisonPanel comparison={comparison} />

        <div className="stay-detail-grid">
          <section className="stay-panel">
            <h2 className="stay-panel-title">Stay profile</h2>

            <div className="stay-profile-grid">
              <div className="stay-profile-item">
                <span className="stay-profile-label">Region</span>
                <span className="stay-profile-value">
                  {getRegionLabel(stay.region)}
                </span>
              </div>

              <div className="stay-profile-item">
                <span className="stay-profile-label">City</span>
                <span className="stay-profile-value">{stay.city}</span>
              </div>

              <div className="stay-profile-item">
                <span className="stay-profile-label">Stay type</span>
                <span className="stay-profile-value">
                  {getStayTypeLabel(stay.stayType)}
                </span>
              </div>

              <div className="stay-profile-item">
                <span className="stay-profile-label">Price band</span>
                <span className="stay-profile-value">
                  {formatPriceBand(stay.priceBand)}
                </span>
              </div>

              <div className="stay-profile-item">
                <span className="stay-profile-label">Last reviewed</span>
                <span className="stay-profile-value">{stay.lastReviewedAt}</span>
              </div>
            </div>
          </section>

          <section className="stay-panel">
            <h2 className="stay-panel-title">Highlights</h2>
            <div className="stay-chip-row">
              {stay.highlights.map((highlight) => (
                <span key={highlight} className="stay-chip">
                  {highlight}
                </span>
              ))}
            </div>
          </section>

          <section className="stay-panel">
            <h2 className="stay-panel-title">Best fit</h2>
            <div className="stay-chip-row">
              {stay.fitTags.map((tag) => (
                <span key={tag} className="stay-chip stay-chip-soft">
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <StayNotesEditor slug={stay.slug} stayName={stay.name} />

          <ReviewHistoryPanel reviewHistory={stay.reviewHistory} />

          {stay.editorialNotes && stay.editorialNotes.length > 0 ? (
            <section className="stay-panel">
              <h2 className="stay-panel-title">Editorial notes</h2>
              <div className="stay-notes-list">
                {stay.editorialNotes.map((note) => (
                  <p key={note} className="stay-note">
                    {note}
                  </p>
                ))}
              </div>
            </section>
          ) : null}

          <section className="stay-panel">
            <h2 className="stay-panel-title">Sources</h2>
            <div className="stay-source-list">
              {stay.sourceLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  className="stay-source-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span>{link.label}</span>
                  <span>↗</span>
                </a>
              ))}
            </div>
          </section>
        </div>

        {related.length > 0 ? (
          <section className="related-section">
            <div className="related-head">
              <div>
                <p className="section-kicker">Related in region</p>
                <h2 className="related-title">
                  More stays from {getRegionLabel(stay.region)}
                </h2>
              </div>
            </div>

            <div className="related-grid">
              {related.map((item) => (
                <article key={item.id} className="related-card">
                  <p className="related-meta">
                    {item.city} / {getStayTypeLabel(item.stayType)}
                  </p>
                  <h3 className="related-card-title">{item.name}</h3>
                  <p className="related-card-text">{item.headline}</p>
                  <div className="related-badges">
                    <FacilityBadges stay={item} />
                  </div>
                  <Link href={`/signals/${item.slug}`} className="related-link">
                    Open stay detail
                  </Link>
                </article>
              ))}
            </div>
          </section>
        ) : null}
      </section>
    </div>
  );
}