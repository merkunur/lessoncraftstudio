'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { FREE_TIER_FLASHCARD_PACKAGES } from '@/lib/flashcards/access-control';

// Pillar 4 Arc 2 Phase 3b — Flashcard paywall preview component.
//
// Rendered when canAccessFlashcard returns { allowed: false, reason: 'gated' }
// — i.e., package is NOT in free-tier allowlist AND visitor is not an active
// subscriber + not admin. Surfaces:
//
//   - "3 of 200 packages free" framing per Arc 2 spec §3 Phase 3
//   - Sample free-tier package links for visitor to try without subscribing
//   - Subscribe CTA → routes to subscription flow per existing pattern
//   - Pixel-identical visual treatment between free + paid per
//     CONVERSATION-HANDOFF §0 + Plan-agent recommendation (we don't show a
//     degraded preview; we show the structural value + subscribe path)

export default function FlashcardPaywall({
  locale,
  packageSlug,
  signedIn,
}: {
  locale: string;
  packageSlug: string;
  signedIn: boolean;
}) {
  const t = useTranslations('flashcardReader.paywall');

  const freeTierPackages = Array.from(FREE_TIER_FLASHCARD_PACKAGES);

  return (
    <article className="max-w-2xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-3">
          {t('title')}
        </h1>
        <p className="text-ink-700">
          {t('body', { packageSlug })}
        </p>
      </header>

      <section className="mb-10 p-6 rounded-lg bg-cream-100 border border-cream-300">
        <h2 className="font-display text-xl font-semibold text-ink-900 mb-3">
          {t('freeTierTeaser.heading')}
        </h2>
        <p className="text-sm text-ink-700 mb-4">{t('freeTierTeaser.body')}</p>
        <ul className="space-y-2">
          {freeTierPackages.map((slug) => (
            <li key={slug}>
              <Link
                href={`/${locale}/flashcards/${slug}`}
                className="inline-flex items-center text-terracotta-500 hover:text-terracotta-600 font-semibold"
              >
                {t('freeTierTeaser.packageLink', { slug })}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="text-center">
        <Link
          href={`/${locale}#subscription`}
          className="inline-flex items-center px-6 py-3 rounded-md bg-terracotta-400 text-cream-50 font-semibold hover:bg-terracotta-500 transition"
        >
          {t('subscribeCta')}
        </Link>
        {!signedIn && (
          <p className="mt-4 text-sm text-ink-600">
            {t('signInPrompt')}
            {' '}
            <Link
              href={`/${locale}/auth/signin`}
              className="text-terracotta-500 hover:text-terracotta-600 font-semibold"
            >
              {t('signInCta')}
            </Link>
          </p>
        )}
      </section>
    </article>
  );
}
