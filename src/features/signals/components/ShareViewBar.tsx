"use client";

import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

interface ShareViewBarProps {
  title: string;
  description: string;
}

async function copyText(value: string): Promise<boolean> {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(value);
      return true;
    }
  } catch {
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const success = document.execCommand("copy");
    document.body.removeChild(textarea);
    return success;
  } catch {
    return false;
  }
}

export default function ShareViewBar({
  title,
  description,
}: ShareViewBarProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");

  async function handleCopy() {
    const query = searchParams.toString();
    const url = `${window.location.origin}${pathname}${query ? `?${query}` : ""}`;
    const ok = await copyText(url);
    setStatus(ok ? "copied" : "failed");

    window.setTimeout(() => {
      setStatus("idle");
    }, 2200);
  }

  return (
    <section className="share-view-bar" aria-label="Share current view">
      <div className="share-view-copy">
        <p className="share-view-title">{title}</p>
        <p className="share-view-text">{description}</p>
      </div>

      <div className="share-view-actions">
        <button type="button" className="btn-secondary" onClick={handleCopy}>
          Copy current URL
        </button>

        <span className="share-view-status" data-state={status}>
          {status === "copied"
            ? "Copied"
            : status === "failed"
              ? "Copy failed"
              : "URL preserves the current state"}
        </span>
      </div>
    </section>
  );
}