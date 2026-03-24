import type { Metadata } from "next";
import Link from "next/link";
import NotesBoard from "../../../features/signals/components/NotesBoard";
import { getAllStays } from "../../../features/signals/lib/allStays";

export const metadata: Metadata = {
  title: "Private notes | Stay Signals",
  description:
    "Locally saved private notes for the current browser.",
};

export default async function SignalsNotesPage() {
  const allStays = await getAllStays();

  return (
    <div className="container">
      <section className="notes-page-shell">
        <div className="stay-detail-breadcrumbs">
          <Link href="/">Home</Link>
          <span> / </span>
          <Link href="/signals">Signals</Link>
          <span> / </span>
          <span>Notes</span>
        </div>

        <div className="compare-page-toolbar">
          <Link href="/signals" className="btn-secondary">
            Back to dashboard
          </Link>
        </div>

        <NotesBoard allStays={allStays} />
      </section>
    </div>
  );
}