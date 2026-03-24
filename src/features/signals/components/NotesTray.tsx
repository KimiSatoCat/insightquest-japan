"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { StayRecord } from "../types";
import {
  deleteStayNote,
  readStayNotes,
  STAY_NOTES_EVENT,
  type StayNotesMap,
} from "./stayNotesStorage";
import { getRegionLabel, getStayTypeLabel } from "../lib/momentum";

interface NotesTrayProps {
  allStays: StayRecord[];
}

function truncateNote(value: string, limit = 180): string {
  const normalized = value.trim();
  if (normalized.length <= limit) {
    return normalized;
  }
  return `${normalized.slice(0, limit)}…`;
}

export default function NotesTray({ allStays }: NotesTrayProps) {
  const [notes, setNotes] = useState<StayNotesMap>({});

  useEffect(() => {
    const sync = () => {
      setNotes(readStayNotes());
    };

    sync();
    window.addEventListener(STAY_NOTES_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(STAY_NOTES_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const notedStays = useMemo(() => {
    const bySlug = new Map(allStays.map((stay) => [stay.slug, stay]));
    return Object.entries(notes)
      .map(([slug, note]) => {
        const stay = bySlug.get(slug);
        if (!stay) return null;
        return { stay, note };
      })
      .filter(
        (item): item is { stay: StayRecord; note: string } => Boolean(item)
      )
      .sort((a, b) => a.stay.name.localeCompare(b.stay.name));
  }, [allStays, notes]);

  if (notedStays.length === 0) {
    return null;
  }

  return (
    <section className="notes-tray-section" aria-label="Saved notes">
      <div className="notes-tray-head">
        <div>
          <p className="section-kicker">Notes</p>
          <h2 className="notes-tray-title">Saved notes visible during comparison</h2>
          <p className="notes-tray-note">
            These notes are stored only in this browser and help keep your own reasoning in view.
          </p>
        </div>

        <div className="notes-tray-head-actions">
          <Link href="/signals/notes" className="bookmark-inline-link">
            Open notes page
          </Link>
        </div>
      </div>

      <div className="notes-tray-grid">
        {notedStays.map(({ stay, note }) => (
          <article key={stay.id} className="notes-tray-card">
            <p className="notes-tray-meta">
              {getRegionLabel(stay.region)} / {stay.city} / {getStayTypeLabel(stay.stayType)}
            </p>

            <h3 className="notes-tray-card-title">{stay.name}</h3>
            <p className="notes-tray-snippet">{truncateNote(note)}</p>

            <div className="notes-tray-actions">
              <Link href={`/signals/${stay.slug}`} className="bookmark-inline-link">
                Open detail
              </Link>

              <button
                type="button"
                className="bookmark-inline-button"
                onClick={() => {
                  const next = { ...notes };
                  delete next[stay.slug];
                  deleteStayNote(stay.slug);
                  setNotes(next);
                }}
              >
                Remove note
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}