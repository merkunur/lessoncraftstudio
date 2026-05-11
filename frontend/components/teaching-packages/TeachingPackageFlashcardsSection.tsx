'use client';

import { useTranslations } from 'next-intl';
import FlashcardPackageReader from '@/components/flashcards/FlashcardPackageReader';

interface Props {
  locale: string;
  packageSlug: string;
}

/**
 * Client wrapper embedding the existing FlashcardPackageReader within the
 * TeachingPackageDetail page. Reuses Pillar 4 Arc 2 Phase 3a/3b access-control
 * + paywall pattern; no new gating logic.
 */
export default function TeachingPackageFlashcardsSection({ locale, packageSlug }: Props) {
  const t = useTranslations('teachingPackagePage.flashcards');

  return (
    <section id="flashcards" className="mb-10 scroll-mt-6">
      <h2 className="font-display text-xl font-semibold text-ink-900 mb-1">
        {t('heading')}
      </h2>
      <p className="text-sm text-ink-500 mb-6">{t('subheading')}</p>
      <div className="rounded-lg border border-cream-300 bg-cream-50 p-4">
        <FlashcardPackageReader locale={locale} packageSlug={packageSlug} />
      </div>
    </section>
  );
}
