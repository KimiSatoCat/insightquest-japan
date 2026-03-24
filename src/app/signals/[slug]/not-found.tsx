import Link from "next/link";

export default function SignalsStayNotFoundPage() {
  return (
    <div className="container">
      <section className="stay-not-found-shell">
        <p className="stay-not-found-kicker">Not found</p>
        <h1 className="stay-not-found-title">
          That stay detail page could not be found.
        </h1>
        <p className="stay-not-found-text">
          The URL may be incorrect, or the entry may no longer be available in
          the current prototype data set.
        </p>

        <div className="stay-not-found-actions">
          <Link href="/signals" className="btn-primary">
            Back to signals dashboard
          </Link>
          <Link href="/" className="btn-secondary">
            Return home
          </Link>
        </div>
      </section>
    </div>
  );
}