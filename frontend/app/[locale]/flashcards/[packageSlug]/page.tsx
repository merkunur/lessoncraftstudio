import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import FlashcardPackageReader from '@/components/flashcards/FlashcardPackageReader';

// Pillar 4 Arc 2 Phase 3b — Per-package flashcard surface.
// Mirrors lesson-plans/[slug]/page.tsx pattern (subscriber-gated; noindex; not
// crawlable). Access gating happens client-side via useAuth +
// canAccessFlashcard (lib/flashcards/access-control); server-side enforcement
// at /api/flashcards/access-check (Phase 3a substrate).
//
// Slug is the package slug (e.g., /en/flashcards/count-objects-1-to-10). Free-
// tier-3-package allowlist accessible without subscription per C5 lock at
// access-control.ts; paid-tier subscribers access full catalog.

export async function generateMetadata({
  params,
}: {
  params: { locale: string; packageSlug: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale: params.locale,
    namespace: 'flashcardReader.metadata',
  });
  return {
    title: t('title'),
    description: t('description'),
    robots: { index: false, follow: false },
  };
}

export default function FlashcardPackagePage({
  params,
}: {
  params: { locale: string; packageSlug: string };
}) {
  return (
    <FlashcardPackageReader
      locale={params.locale}
      packageSlug={params.packageSlug}
    />
  );
}
