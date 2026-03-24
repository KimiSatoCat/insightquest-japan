"use client";

import { useEffect, useState } from "react";
import { readBookmarks, toggleBookmark, BOOKMARKS_EVENT } from "./bookmarkStorage";

interface BookmarkButtonProps {
  slug: string;
  compact?: boolean;
}

export default function BookmarkButton({
  slug,
  compact = false,
}: BookmarkButtonProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const sync = () => {
      setActive(readBookmarks().includes(slug));
    };

    sync();
    window.addEventListener(BOOKMARKS_EVENT, sync);
    window.addEventListener("storage", sync);

    return () => {
      window.removeEventListener(BOOKMARKS_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  function handleClick() {
    const next = toggleBookmark(slug);
    setActive(next.includes(slug));
  }

  return (
    <button
      type="button"
      className="bookmark-button"
      data-active={active}
      data-compact={compact}
      onClick={handleClick}
      aria-pressed={active}
    >
      {active ? "Bookmarked" : "Save bookmark"}
    </button>
  );
}