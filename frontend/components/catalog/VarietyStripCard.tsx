'use client';

/**
 * Client wrapper for a single VarietyStrip deck card.
 *
 * Per CLAUDE.md §7 (post-2026-05-17 sign-in-gate removal): variety-strip
 * deck plays are anonymous-accessible. Plain `<a href>` — no gate.
 */

interface VarietyStripCardProps {
  deckUrl: string;
  title: string;
  thumbnailUrl: string;
  languageLabel: string;
  languageAriaLabel: string;
}

export default function VarietyStripCard({
  deckUrl,
  title,
  thumbnailUrl,
  languageLabel,
  languageAriaLabel,
}: VarietyStripCardProps) {
  return (
    <a href={deckUrl} className="block group">
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
  );
}
