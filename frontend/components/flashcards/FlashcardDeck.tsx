'use client';

import { useTranslations } from 'next-intl';
import type { AccessReason } from '@/lib/flashcards/access-control';

// Pillar 4 Arc 2 Phase 3b — Flashcard deck iframe embed.
//
// Embeds the Hetzner-CDN-served deck.html from
// /var/www/lcs-media/flashcards/<locale>/<package>/deck.html. Print PDF
// download links exposed alongside; both print-6up.pdf + print-9up.pdf
// served from same CDN dir per Phase 2 mass-run + nginx /flashcards/ block.
//
// Sky+v2 design canonical preserves visual fidelity inside iframe (deck.html
// is self-contained per §14.1 embed-readiness substrate). Responsive sizing
// constrained by parent container; iframe aspect-ratio inherited from
// embedded deck.html's own grid layout.

const CDN_BASE = 'https://www.lessoncraftstudio.com/flashcards';

export default function FlashcardDeck({
  locale,
  packageSlug,
  accessReason: _accessReason,
}: {
  locale: string;
  packageSlug: string;
  accessReason: AccessReason;
}) {
  const t = useTranslations('flashcardReader');

  const deckUrl = `${CDN_BASE}/${locale}/${packageSlug}/deck.html`;
  const print6Url = `${CDN_BASE}/${locale}/${packageSlug}/print-6up.pdf`;
  const print9Url = `${CDN_BASE}/${locale}/${packageSlug}/print-9up.pdf`;

  return (
    <article>
      <header className="mb-6">
        <h1 className="font-display text-3xl md:text-4xl font-semibold text-ink-900 mb-2">
          {t('deck.title', { packageSlug })}
        </h1>
        <p className="text-sm text-ink-500">{t('deck.subtitle')}</p>
      </header>

      <div className="aspect-[3/4] md:aspect-[4/3] w-full mb-8 rounded-lg overflow-hidden border border-cream-300 bg-cream-50">
        <iframe
          src={deckUrl}
          title={t('deck.iframeTitle')}
          className="w-full h-full"
          loading="lazy"
          // sandbox allows scripts (deck.html runtime) + same-origin (image
          // requests within deck.html); blocks form submission + popups by
          // default. Adjust if deck.html runtime surfaces new requirements.
          sandbox="allow-scripts allow-same-origin"
        />
      </div>

      <section className="mt-6 print:hidden">
        <h2 className="font-display text-lg font-semibold text-ink-900 mb-3">
          {t('deck.printSection.heading')}
        </h2>
        <p className="text-sm text-ink-700 mb-4">
          {t('deck.printSection.body')}
        </p>
        <div className="flex flex-wrap gap-3">
          <a
            href={print6Url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center px-4 py-2 rounded-md bg-sage-400 text-cream-50 font-semibold hover:bg-sage-500 transition"
          >
            {t('deck.printSection.print6up')}
          </a>
          <a
            href={print9Url}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center px-4 py-2 rounded-md bg-sage-400 text-cream-50 font-semibold hover:bg-sage-500 transition"
          >
            {t('deck.printSection.print9up')}
          </a>
        </div>
      </section>
    </article>
  );
}
