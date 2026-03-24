export const STAY_NOTES_STORAGE_KEY = "stay_signals_notes";
export const STAY_NOTES_EVENT = "stay-signals-notes-changed";

export type StayNotesMap = Record<string, string>;

export function readStayNotes(): StayNotesMap {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STAY_NOTES_STORAGE_KEY);
    if (!raw) {
      return {};
    }

    const parsed: unknown = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) {
      return {};
    }

    const entries = Object.entries(parsed as Record<string, unknown>)
      .filter(([, value]) => typeof value === "string")
      .map(([key, value]) => [key, String(value)]);

    return Object.fromEntries(entries);
  } catch {
    return {};
  }
}

export function readStayNote(slug: string): string {
  const notes = readStayNotes();
  return notes[slug] ?? "";
}

export function writeStayNote(slug: string, value: string): StayNotesMap {
  const notes = readStayNotes();
  const trimmed = value.trim();

  if (trimmed.length === 0) {
    delete notes[slug];
  } else {
    notes[slug] = value;
  }

  persistStayNotes(notes);
  return notes;
}

export function deleteStayNote(slug: string): StayNotesMap {
  const notes = readStayNotes();
  delete notes[slug];
  persistStayNotes(notes);
  return notes;
}

export function clearStayNotes(): void {
  persistStayNotes({});
}

function persistStayNotes(notes: StayNotesMap): void {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(
    STAY_NOTES_STORAGE_KEY,
    JSON.stringify(notes)
  );
  window.dispatchEvent(new Event(STAY_NOTES_EVENT));
}