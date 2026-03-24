"use client";

import Link from "next/link";
import { useState } from "react";

type WorkflowStripLink = {
  href: string;
  label: string;
  primary?: boolean;
};

type WorkflowStripProps = {
  title: string;
  text: string;
  links: WorkflowStripLink[];
  eyebrow?: string;
  ariaLabel?: string;
  className?: string;
  activeHref?: string;
  currentLabel?: string;
  showCopyButton?: boolean;
  copyLabel?: string;
  copySuccessLabel?: string;
  copyErrorLabel?: string;
};

export default function WorkflowStrip({
  title,
  text,
  links,
  eyebrow = "Signals workflow",
  ariaLabel = "Signals workflow",
  className = "",
  activeHref,
  currentLabel,
  showCopyButton = true,
  copyLabel = "Copy page URL",
  copySuccessLabel = "Copied",
  copyErrorLabel = "Copy failed",
}: WorkflowStripProps) {
  const [copyState, setCopyState] = useState<"idle" | "success" | "error">("idle");

  const handleCopy = async () => {
    if (typeof window === "undefined") return;

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopyState("success");
    } catch {
      setCopyState("error");
    }

    window.setTimeout(() => {
      setCopyState("idle");
    }, 1600);
  };

  const buttonLabel =
    copyState === "success"
      ? copySuccessLabel
      : copyState === "error"
        ? copyErrorLabel
        : copyLabel;

  return (
    <section
      className={["iq-workflow-strip", className].filter(Boolean).join(" ")}
      aria-label={ariaLabel}
    >
      <div className="iq-workflow-strip__copy">
        <p className="iq-workflow-strip__eyebrow">{eyebrow}</p>
        <h2 className="iq-workflow-strip__title">{title}</h2>
        <p className="iq-workflow-strip__text">{text}</p>
      </div>
      <div className="iq-workflow-strip__actions">
        {links.map((link) => {
          const isCurrent = activeHref === link.href;
          const classNames = [
            "iq-workflow-strip__cta",
            link.primary ? "is-primary" : "",
            isCurrent ? "is-current" : "",
          ]
            .filter(Boolean)
            .join(" ");

          if (isCurrent) {
            return (
              <span key={`${link.href}-${link.label}`} className={classNames} aria-current={isCurrent ? "page" : undefined}>
                {link.label}
              </span>
            );
          }

          return (
            <Link key={`${link.href}-${link.label}`} href={link.href} className={classNames}>
              {link.label}
            </Link>
          );
        })}
        {currentLabel ? (
          <span className="iq-workflow-strip__cta is-static-current" aria-current="page">
            {currentLabel}
          </span>
        ) : null}
        {showCopyButton ? (
          <button
            type="button"
            className="iq-workflow-strip__cta iq-workflow-strip__copy-button"
            data-copy-state={copyState === "idle" ? undefined : copyState}
            onClick={handleCopy}
            title={copyLabel}
            aria-label={copyLabel}
          >
            {buttonLabel}
          </button>
        ) : null}
      </div>
    </section>
  );
}
