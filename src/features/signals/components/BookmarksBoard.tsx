"use client";

import WorkflowStrip from "./WorkflowStrip";
import { WORKFLOW_STRIP_PRESETS } from "../config/workflowStripPresets";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { StayRecord } from "../types";
import {
BOOKMARKS_EVENT,
  clearBookmarks,
  readBookmarks,
  removeBookmark,
} from "./bookmarkStorage";
import { getRegionLabel, getStayTypeLabel } from "../lib/momentum";

interface BookmarksBoardProps {
  allStays: StayRecord[];
}

export default function BookmarksBoard({ allStays }: BookmarksBoardProps) {
  const [bookmarkSlugs, setBookmarkSlugs] = useState<string[]>([]);

  useEffect(() => {
    const sync = () => {
      setBookmarkSlugs(readBookmarks());
    };

    sync();
    window.addEventListener(BOOKMARKS_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(BOOKMARKS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const bookmarkedStays = useMemo(() => {
    const bySlug = new Map(allStays.map((stay) => [stay.slug, stay]));
    return bookmarkSlugs
      .map((slug) => bySlug.get(slug))
      .filter((stay): stay is StayRecord => Boolean(stay));
  }, [allStays, bookmarkSlugs]);

  if (bookmarkedStays.length === 0) {
    return (
      <section className="stay-not-found-shell">
                        <WorkflowStrip {...WORKFLOW_STRIP_PRESETS.bookmarks} />

        <p className="stay-not-found-kicker">Bookmarks</p>
        <h1 className="stay-not-found-title">
          No stays have been bookmarked yet.
        </h1>
        <p className="stay-not-found-text">
          Save bookmarks from the dashboard or from a stay detail page, then return
          here to review them in one place.
        </p>

        <div className="stay-not-found-actions">
          <Link href="/signals" className="btn-primary">
            Go to signals dashboard
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bookmarks-board">
      <div className="bookmarks-head">
        <div>
          <p className="section-kicker">Saved locally</p>
          <h1 className="bookmarks-page-title">Bookmarked stays</h1>
          <p className="bookmarks-note">
            These saved stays are stored only in this browser and can be cleared at any time.
          </p>
        </div>

        <div className="bookmarks-head-actions">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => {
              clearBookmarks();
              setBookmarkSlugs([]);
            }}
          >
            Clear all bookmarks
          </button>
        </div>
      </div>

      <div className="bookmarks-grid">
        {bookmarkedStays.map((stay) => (
          <article key={stay.id} className="bookmarks-card bookmarks-card-large">
            <p className="bookmarks-meta">
              {getRegionLabel(stay.region)} / {stay.city} / {getStayTypeLabel(stay.stayType)}
            </p>

            <h2 className="bookmarks-card-title">{stay.name}</h2>
            <p className="bookmarks-card-text">{stay.summary}</p>

            <div className="bookmarks-chip-row">
              {stay.fitTags.slice(0, 4).map((tag) => (
                <span key={tag} className="bookmarks-chip">
                  {tag}
                </span>
              ))}
            </div>

            <div className="bookmarks-data-rows">
              <div className="bookmarks-data-row">
                <span className="bookmarks-data-label">Last reviewed</span>
                <span className="bookmarks-data-value">{stay.lastReviewedAt}</span>
              </div>

              <div className="bookmarks-data-row">
                <span className="bookmarks-data-label">Headline</span>
                <span className="bookmarks-data-value">{stay.headline}</span>
              </div>
            </div>

            <div className="bookmarks-actions">
              <Link href={`/signals/${stay.slug}`} className="bookmark-inline-link">
                Open detail
              </Link>

              <button
                type="button"
                className="bookmark-inline-button"
                onClick={() => {
                  const next = removeBookmark(stay.slug);
                  setBookmarkSlugs(next);
                }}
              >
                Remove
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}