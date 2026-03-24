import type { Metadata } from "next";
import Link from "next/link";
import ShortlistBoard from "../../../features/signals/components/ShortlistBoard";
import { getAllStays } from "../../../features/signals/lib/allStays";

export const metadata: Metadata = {
  title: "Shortlist | Stay Signals",
  description:
    "A merged shortlist of bookmarked stays and noted stays for the current browser.",
};

export default async function SignalsShortlistPage() {
  const allStays = await getAllStays();

  return (
    <div className="container">
      <section className="shortlist-page-shell">
        <div className="stay-detail-breadcrumbs">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/signals">Signals</Link>
          <span> / </span>
          <span>Shortlist</span>
        </div>

        <div className="compare-page-toolbar">
          <Link href="/signals" className="btn-secondary">
            Back to dashboard
          </Link>
        </div>

        <ShortlistBoard allStays={allStays} />
      </section>
    </div>
  );
}