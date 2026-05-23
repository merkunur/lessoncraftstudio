'use client';

/* Featured deck tile (v3) — Direction A restyled.
   Click → opens iframe modal that loads the self-contained deck.html.
   Lock body scroll while modal open; ESC closes. */

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

interface Props {
  slug: string;
  locale: string;
  title: string;
  languageLabel: string;
  thumbnailUrl: string;
  deckUrl: string;
}

export default function FeaturedDeckTileV3({
  title,
  languageLabel,
  thumbnailUrl,
  deckUrl,
}: Props) {
  const t = useTranslations('homepageV3.featuredTile');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="hv3-card-deep group relative block w-full text-left overflow-hidden"
        aria-label={`${t('badge')}: ${title}`}
      >
        <div className="relative aspect-[480/620] bg-lcs-cream overflow-hidden rounded-t-[28px]">
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {/* Featured badge */}
          <span className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-lcs-teal text-lcs-cream font-lcsBody font-semibold text-xs uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-lcs-coral inline-block" aria-hidden="true" />
            {t('badge')}
          </span>
          {/* Locale chip */}
          <span className="absolute top-4 right-4 hv3-locale-chip hv3-locale-chip-active">{languageLabel}</span>
          {/* Play overlay on hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-lcs-teal/0 group-hover:bg-lcs-teal/30 transition-colors duration-300">
            <span className="w-20 h-20 rounded-full bg-lcs-coral text-lcs-cream flex items-center justify-center shadow-[0_12px_28px_-4px_rgba(242,120,75,0.6)] opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300">
              <svg className="w-9 h-9 ml-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </div>
        </div>
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <span className="font-lcsDisplay font-semibold text-base text-lcs-teal truncate">{title}</span>
          <span className="font-lcsBody text-xs font-semibold text-lcs-teal/60 flex-shrink-0">
            {t('cta')}
          </span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-lcs-teal-deep/90 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-lcs-cream rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-lcs-teal/15 flex-shrink-0">
              <span className="font-lcsDisplay font-semibold text-base text-lcs-teal truncate">{title}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-lcs-teal/70 hover:text-lcs-teal rounded-full hover:bg-lcs-teal/10 transition-colors"
                aria-label={t('closeAria')}
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <iframe
              src={deckUrl}
              title={title}
              className="flex-1 w-full border-0 bg-lcs-cream"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
