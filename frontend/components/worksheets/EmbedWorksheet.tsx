'use client';

import { useState } from 'react';

/**
 * Landing-page "Embed this worksheet" affordance (CLAUDE.md §1 embed flywheel,
 * W6). Surfaces the copy-paste embed snippet on the `/[locale]/worksheets/[slug]`
 * landing — the SEO arrival page — so a teacher who finds a worksheet can grab the
 * snippet from the page they're on. The snippet (built server-side via
 * `@/lib/seo/embed-snippet`) carries the two crawlable backlinks; this component is
 * pure presentation (toggle + read-only textarea + clipboard copy), no data.
 */
export function EmbedWorksheet({
  snippet,
  labels,
}: {
  snippet: string;
  labels: { button: string; copy: string; copied: string };
}) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(snippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the textarea is selectable as a fallback */
    }
  }

  return (
    <div className="mt-3 max-w-3xl">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 font-bold text-[15px] rounded-full px-6 py-3 bg-white text-[#146B5E] border-2 border-[#146B5E] hover:bg-[#E3EEEB] transition-colors"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]">
          <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
        </svg>
        {labels.button}
      </button>
      {open && (
        <div className="mt-3">
          <textarea
            readOnly
            value={snippet}
            rows={6}
            onFocus={(e) => e.currentTarget.select()}
            className="w-full text-xs font-mono bg-[#FBF6EE] border border-cream-300 rounded-xl p-3 text-ink-700 resize-y leading-relaxed"
            aria-label={labels.button}
          />
          <button
            type="button"
            onClick={copy}
            className="mt-2 inline-flex items-center gap-2 font-bold text-sm rounded-full px-5 py-2.5 bg-[#146B5E] text-white hover:bg-[#0E544A] transition-colors"
          >
            {copied ? labels.copied : labels.copy}
          </button>
        </div>
      )}
    </div>
  );
}
