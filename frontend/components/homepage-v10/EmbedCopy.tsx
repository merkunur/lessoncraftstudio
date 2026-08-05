'use client';

import { useId, useRef, useState } from 'react';

/**
 * The loan label's working half — Room V, homepage v10.
 *
 * The snippet handed in is the REAL one, built by the same
 * `buildEmbedSnippet()` the worksheet landing pages use, for a real published
 * deck. Nothing here is a mockup of a snippet: what is displayed is byte-for-
 * byte what lands on the clipboard, and what lands on the clipboard works if
 * pasted into a school site.
 *
 * This is the only client JS the room adds; everything else in the block is
 * server-rendered.
 *
 * ⚠ THE FAILURE PATH DOES NOT LIE. If the Clipboard API is missing or the
 * browser refuses the write (insecure context, permissions policy, older
 * Safari), the snippet is SELECTED so Ctrl+C still works — and the button does
 * NOT flip to "Copied!". A success state for something that did not happen is
 * worse than no button.
 */
export default function EmbedCopy({
  snippet,
  caption,
  copyLabel,
  copiedLabel,
}: {
  snippet: string;
  caption: string;
  copyLabel: string;
  copiedLabel: string;
}) {
  const captionId = useId();
  const preRef = useRef<HTMLPreElement>(null);
  const [copied, setCopied] = useState(false);

  function selectSnippet() {
    const el = preRef.current;
    if (!el) return;
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel?.removeAllRanges();
    sel?.addRange(range);
  }

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // No success claim — the text is now selected and Ctrl+C-able.
      selectSnippet();
    }
  }

  return (
    <>
      <p className="hv10-loan-cap" id={captionId}>
        {caption}
      </p>
      <div className="hv10-loan-codewrap">
        {/* role=region + tabIndex so a keyboard user can actually scroll the
            box (WCAG 2.1.1); labelled BY the caption rather than repeating it
            in an aria-label. */}
        <pre
          ref={preRef}
          className="hv10-loan-code"
          role="region"
          aria-labelledby={captionId}
          tabIndex={0}
        >
          <code>{snippet}</code>
        </pre>
      </div>
      {/* aria-label is deliberately FIXED to the copy label: an accessible
          name that changes mid-interaction is announced as a new control.
          Only the visible text swaps; the live region below announces. */}
      <button
        type="button"
        className="hv10-loan-copy"
        onClick={onCopy}
        aria-label={copyLabel}
        data-copied={copied ? 'true' : 'false'}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {copied ? (
            <path d="M20 6 9 17l-5-5" />
          ) : (
            <>
              <rect x="9" y="9" width="12" height="12" rx="2" />
              <path d="M5 15V5a2 2 0 0 1 2-2h10" />
            </>
          )}
        </svg>
        {copied ? copiedLabel : copyLabel}
      </button>
      <span role="status" aria-live="polite" className="hv10-loan-sr">
        {copied ? copiedLabel : ''}
      </span>
    </>
  );
}
