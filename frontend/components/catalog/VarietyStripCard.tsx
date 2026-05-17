'use client';

import { useSignInGate } from '@/components/auth/SignInRequiredGate';

/**
 * Client wrapper for a single VarietyStrip deck card.
 *
 * Per CLAUDE.md §7 (post-subscription-pivot): clicking a variety-strip
 * deck card requires sign-in. Unsigned users redirect to signup with the
 * deck URL preserved as `?redirect=`.
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
  const { gatedClick } = useSignInGate();

  return (
    <a
      href={deckUrl}
      onClick={e => gatedClick(e, deckUrl, 'self')}
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
  );
}
