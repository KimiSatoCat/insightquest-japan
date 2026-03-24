"use client";

import { useEffect, useState } from "react";
import {
  deleteStayNote,
  readStayNote,
  STAY_NOTES_EVENT,
  writeStayNote,
} from "./stayNotesStorage";

interface StayNotesEditorProps {
  slug: string;
  stayName: string;
}

export default function StayNotesEditor({
  slug,
  stayName,
}: StayNotesEditorProps) {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "saved" | "cleared">("idle");

  useEffect(() => {
    const sync = () => {
      setValue(readStayNote(slug));
    };

    sync();
    window.addEventListener(STAY_NOTES_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(STAY_NOTES_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  function handleSave() {
    writeStayNote(slug, value);
    setStatus(value.trim().length > 0 ? "saved" : "cleared");

    window.setTimeout(() => {
      setStatus("idle");
    }, 2200);
  }

  function handleClear() {
    deleteStayNote(slug);
    setValue("");
    setStatus("cleared");

    window.setTimeout(() => {
      setStatus("idle");
    }, 2200);
  }

  return (
    <section className="stay-panel">
      <div className="stay-notes-head">
        <div>
          <h2 className="stay-panel-title">Private notes</h2>
          <p className="stay-notes-caption">
            Saved only in this browser for <strong>{stayName}</strong>.
          </p>
        </div>
      </div>

      <textarea
        className="stay-notes-textarea"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Write what stood out, what you want to compare later, or what still feels unclear."
        rows={6}
      />

      <div className="stay-notes-actions">
        <button type="button" className="btn-primary" onClick={handleSave}>
          Save note
        </button>

        <button type="button" className="btn-secondary" onClick={handleClear}>
          Clear note
        </button>

        <span className="stay-notes-status" data-state={status}>
          {status === "saved"
            ? "Saved locally"
            : status === "cleared"
              ? "Cleared locally"
              : "Notes stay in this browser only"}
        </span>
      </div>
    </section>
  );
}