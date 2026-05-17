'use client';

/**
 * Client wrapper for a single BreadthGrid deck thumbnail.
 *
 * Per CLAUDE.md §7 (post-2026-05-17 sign-in-gate removal): deck plays are
 * anonymous-accessible. Plain `<a href>` — no gate, no hook.
 *
 * Kept as a `'use client'` wrapper component (rather than inlining back
 * into the server BreadthGrid) for cheap future re-introduction of any
 * per-thumbnail interactivity (analytics, animation, etc.).
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
  return (
    <a
      href={deckUrl}
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
