import type { Metadata } from "next";
import Link from "next/link";
import BookmarksBoard from "../../../features/signals/components/BookmarksBoard";
import { getAllStays } from "../../../features/signals/lib/allStays";

export const metadata: Metadata = {
  title: "Bookmarks | Stay Signals",
  description:
    "Locally saved bookmarked stays for the current browser.",
};

export default async function SignalsBookmarksPage() {
  const allStays = await getAllStays();

  return (
    <div className="container">
      <section className="bookmarks-page-shell">
        <div className="stay-detail-breadcrumbs">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/signals">Signals</Link>
          <span> / </span>
          <span>Bookmarks</span>
        </div>

        <div className="compare-page-toolbar">
          <Link href="/signals" className="btn-secondary">
            Back to dashboard
          </Link>
        </div>

        <BookmarksBoard allStays={allStays} />
      </section>
    </div>
  );
}