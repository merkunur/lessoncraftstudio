'use client';

import { useQuotaGatedClick } from '@/components/quota/QuotaExceededModal';

/**
 * Client wrapper for a single VarietyStrip deck card.
 *
 * Variety strips on topic pages link to deck URLs across multiple locales
 * (cross-locale strip). Each click counts as a quota-gated 'play' action
 * per CLAUDE.md §7 free-tier 2/day cap.
 *
 * Middle-click bypasses the onClick (browser opens href directly in new
 * tab) — catalog deck URLs are SEO-public by design per §7.
 */

interface VarietyStripCardProps {
  deckId: string;
  deckUrl: string;
  title: string;
  thumbnailUrl: string;
  languageLabel: string;
  languageAriaLabel: string;
}

export default function VarietyStripCard({
  deckId,
  deckUrl,
  title,
  thumbnailUrl,
  languageLabel,
  languageAriaLabel,
}: VarietyStripCardProps) {
  const { gatedClick, QuotaModalElement } = useQuotaGatedClick();

  return (
    <>
      <a
        href={deckUrl}
        onClick={e => gatedClick(e, deckUrl, 'play', deckId, 'self')}
        className="block group"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={thumbnailUrl}
          alt={title}
          width={480}
          height={620}
          loading="lazy"
          className="w-full h-auto bg-cream-50"
        />
        <div className="px-3 py-2 flex items-center justify-between gap-2">
          <span className="text-sm font-medium text-ink-900 truncate group-hover:text-leaf-700">
            {title}
          </span>
          <span
            className="text-xs font-medium text-ink-500 flex-shrink-0"
            aria-label={languageAriaLabel}
          >
            {languageLabel}
          </span>
        </div>
      </a>
      {QuotaModalElement}
    </>
  );
}
