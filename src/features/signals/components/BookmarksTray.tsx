"use client";

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

interface BookmarksTrayProps {
  allStays: StayRecord[];
}

export default function BookmarksTray({ allStays }: BookmarksTrayProps) {
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
    return null;
  }

  return (
    <section className="bookmarks-section" aria-label="Saved bookmarks">
      <div className="bookmarks-head">
        <div>
          <p className="section-kicker">Bookmarks</p>
          <h2 className="bookmarks-title">Saved stays to revisit later</h2>
          <p className="bookmarks-note">
            Bookmarks are stored in this browser only.
          </p>
        </div>

        <div className="bookmarks-head-actions">
          <Link href="/signals/bookmarks" className="bookmark-inline-link">
            Open bookmarks page
          </Link>

          <button
            type="button"
            className="bookmark-inline-button"
            onClick={() => {
              clearBookmarks();
              setBookmarkSlugs([]);
            }}
          >
            Clear all
          </button>
        </div>
      </div>

      <div className="bookmarks-grid">
        {bookmarkedStays.map((stay) => (
          <article key={stay.id} className="bookmarks-card">
            <p className="bookmarks-meta">
              {getRegionLabel(stay.region)} / {stay.city} / {getStayTypeLabel(stay.stayType)}
            </p>

            <h3 className="bookmarks-card-title">{stay.name}</h3>
            <p className="bookmarks-card-text">{stay.headline}</p>

            <div className="bookmarks-chip-row">
              {stay.fitTags.slice(0, 3).map((tag) => (
                <span key={tag} className="bookmarks-chip">
                  {tag}
                </span>
              ))}
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