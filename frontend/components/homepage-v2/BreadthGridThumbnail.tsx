'use client';

import { useSignInGate } from '@/components/auth/SignInRequiredGate';

/**
 * Client wrapper for a single BreadthGrid deck thumbnail.
 *
 * Per CLAUDE.md §7 (post-subscription-pivot): clicking a homepage deck
 * thumbnail requires sign-in. Unsigned users redirected to signup with
 * the deck URL as `?redirect=`.
 *
 * Middle-click / ctrl-click bypass the onClick (browser opens href directly
 * in new tab); the deck URL is SEO-public per §7 locked design.
 */

interface BreadthGridThumbnailProps {
  slug: string;
  language: string;
  title: string;
  languageLabel: string;
  thumbnailUrl: string;
  deckUrl: string;
  ariaLabel: string;
}

export default function BreadthGridThumbnail({
  title,
  languageLabel,
  thumbnailUrl,
  deckUrl,
  ariaLabel,
}: BreadthGridThumbnailProps) {
  const { gatedClick } = useSignInGate();

  return (
    <a
      href={deckUrl}
      onClick={e => gatedClick(e, deckUrl, 'self')}
      className="group block rounded-md overflow-hidden bg-cream-50 border border-cream-300 hover:border-ink-700 hover:shadow-md transition-all"
      aria-label={ariaLabel}
    >
      <div className="relative aspect-[480/620] bg-cream-50">
        <img
          src={thumbnailUrl}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="px-4 py-3 flex items-center justify-between gap-2">
        <span className="text-sm font-medium text-ink-900 truncate">
          {title}
        </span>
        <span
          className="text-xs font-medium text-ink-500 flex-shrink-0"
          aria-label={`Language: ${languageLabel}`}
        >
          {languageLabel}
        </span>
      </div>
    </a>
  );
}
