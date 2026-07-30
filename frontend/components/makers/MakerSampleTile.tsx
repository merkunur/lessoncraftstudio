'use client';

/* MakerSampleTile — a thumbnail tile for the "See what you can make" section on the
 * worksheet-generator (maker) landing pages. Direction-A styled.
 *
 * variant='interactive': the whole tile is a <button>; click → full-screen modal that
 *   loads the self-contained deck.html in an <iframe>. ESC closes; body scroll locks.
 *   A coral play-circle overlay appears on hover/focus (cloned from FeaturedDeckTileV3).
 * variant='pdf': the whole tile is a plain <a href={pdfUrl}> opening the printable in a
 *   new tab — no modal, no play overlay, a small "PDF" corner badge instead.
 *
 * Chrome strings are PROPS (not the homepageV3 i18n namespace) — passed by MakerSamples.
 */

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface MakerSampleTileProps {
  variant: 'interactive' | 'pdf';
  title: string;            // shown under the thumbnail (and in the modal header)
  thumbnailUrl: string;     // already wwwImg-normalized
  deckUrl?: string;         // interactive: iframe src in the modal
  pdfUrl?: string;          // pdf: link target
  chipLabel?: string;       // corner chip (locale or target-language); omit chip if undefined
  playLabel: string;        // e.g. "Play sample" — visible affordance + aria
  closeLabel: string;       // modal close aria-label
  /* Crawlable link to this sample's /worksheets/ landing, rendered UNDER the tile.
   * Additive: the interactive tile is a <button> opening a modal, so before this the
   * maker pages emitted no followable link to any worksheet at all — they were crawl
   * dead-ends. Same pattern as FeaturedDeckTileV3's `deckHref`. Omit → nothing renders. */
  landingHref?: string;
  landingLabel?: string;    // visible text for landingHref
}

const THUMB_SIZES = '(max-width:639px) 90vw, (max-width:1023px) 45vw, 300px';

export default function MakerSampleTile({
  variant,
  title,
  thumbnailUrl,
  deckUrl,
  pdfUrl,
  chipLabel,
  playLabel,
  closeLabel,
  landingHref,
  landingLabel,
}: MakerSampleTileProps) {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  // ESC closes the modal.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const chip = chipLabel ? (
    <span className="absolute top-3 right-3 z-10 bg-[#146B5E] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full">
      {chipLabel}
    </span>
  ) : null;

  const thumb = (
    <div className="relative aspect-[480/620] bg-[#FBF3E4] overflow-hidden rounded-2xl">
      <Image
        src={thumbnailUrl}
        alt={title}
        fill
        sizes={THUMB_SIZES}
        loading="lazy"
        className="object-cover transition-transform duration-500 group-hover:scale-105"
      />
      {chip}
      {variant === 'interactive' ? (
        <div className="absolute inset-0 flex items-center justify-center bg-[#146B5E]/0 group-hover:bg-[#146B5E]/30 group-focus-visible:bg-[#146B5E]/30 transition-colors duration-300">
          <span className="w-16 h-16 rounded-full bg-[#F2784B] text-white flex items-center justify-center shadow-[0_12px_28px_-4px_rgba(242,120,75,0.6)] opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transform scale-90 group-hover:scale-100 group-focus-visible:scale-100 transition-all duration-300">
            <svg className="w-8 h-8 ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M8 5v14l11-7z" />
            </svg>
          </span>
        </div>
      ) : (
        <span className="absolute bottom-3 left-3 z-10 bg-[#0E544A] text-white text-[11px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wide">
          PDF
        </span>
      )}
    </div>
  );

  const titleRow = (
    <div className="px-1 pt-3 flex items-center justify-between gap-3">
      <span className="font-display font-semibold text-[15px] text-[#146B5E] truncate">{title}</span>
      {variant === 'interactive' && (
        <span className="font-sans text-xs font-semibold text-[#146B5E]/60 flex-shrink-0">
          {playLabel}
        </span>
      )}
    </div>
  );

  // Plain <a>, not <Link>: a sample whose deck has no landing falls back to the
  // nginx /decks/ URL, whose trailing slash <Link> would strip and 404 (§15.7).
  const landingLink = landingHref ? (
    <div className="px-1 pt-1">
      <a
        href={landingHref}
        className="font-sans text-xs font-semibold text-[#146B5E]/70 hover:text-[#F2784B] hover:underline"
      >
        {landingLabel ?? title} →
      </a>
    </div>
  ) : null;

  if (variant === 'pdf') {
    return (
      <div>
        <a
          href={pdfUrl}
          target="_blank"
          rel="noopener"
          className="group block w-full text-left rounded-2xl shadow-[0_2px_8px_rgba(20,30,28,0.08)] hover:shadow-[0_8px_20px_rgba(20,30,28,0.14)] transition-shadow"
          aria-label={`${title} (PDF)`}
        >
          {thumb}
          {titleRow}
        </a>
        {landingLink}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group block w-full text-left rounded-2xl shadow-[0_2px_8px_rgba(20,30,28,0.08)] hover:shadow-[0_8px_20px_rgba(20,30,28,0.14)] transition-shadow"
        aria-label={`${playLabel}: ${title}`}
      >
        {thumb}
        {titleRow}
      </button>
      {landingLink}

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#0E544A]/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-[#FBF3E4] rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#146B5E]/15 flex-shrink-0">
              <span className="font-display font-semibold text-base text-[#146B5E] truncate">{title}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-[#146B5E]/70 hover:text-[#146B5E] rounded-full hover:bg-[#146B5E]/10 transition-colors"
                aria-label={closeLabel}
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <iframe
              src={deckUrl}
              title={title}
              className="flex-1 w-full border-0 bg-[#FBF3E4]"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
