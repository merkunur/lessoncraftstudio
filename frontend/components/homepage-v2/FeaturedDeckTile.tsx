'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';

// Featured deck tile per HOMEPAGE-IMPLEMENTATION-PROMPT.md §5.2.
// On click, opens a modal that iframes the deck.html (self-contained per CLAUDE.md §14.1).
// Satisfies the §1 invariant that every public-facing page embeds a working sample deck.

interface FeaturedDeckTileProps {
  slug: string;
  locale: string;
  title: string;
  languageLabel: string;
  thumbnailUrl: string;
  deckUrl: string;
}

export default function FeaturedDeckTile({
  slug,
  locale,
  title,
  languageLabel,
  thumbnailUrl,
  deckUrl,
}: FeaturedDeckTileProps) {
  const t = useTranslations('homepage.breadthGrid');
  const [open, setOpen] = useState(false);

  // Lock body scroll while modal is open.
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="group relative block w-full text-left rounded-xl overflow-hidden bg-white border border-gray-200 hover:border-gray-400 hover:shadow-lg transition-all"
        aria-label={t('playInline') + ': ' + title}
      >
        <div className="relative aspect-[480/620] bg-gray-50">
          <img
            src={thumbnailUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover"
          />
          <span className="absolute top-3 left-3 inline-flex items-center px-2 py-1 rounded-full bg-gray-900 text-white text-xs font-medium">
            {t('featuredBadge')}
          </span>
        </div>
        <div className="px-4 py-3 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-gray-900 truncate">{title}</span>
          <span className="text-xs font-medium text-gray-500 flex-shrink-0" aria-label={`Language: ${languageLabel}`}>
            {languageLabel}
          </span>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/80 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={title}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl h-full max-h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 flex-shrink-0">
              <span className="text-sm font-medium text-gray-900 truncate">{title}</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 -mr-2 text-gray-500 hover:text-gray-900 rounded-md hover:bg-gray-100 transition-colors"
                aria-label={t('closeFeatured')}
              >
                <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            <iframe
              src={deckUrl}
              title={title}
              className="flex-1 w-full border-0 bg-white"
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}
