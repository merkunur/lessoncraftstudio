import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// /[locale]/teaching-packages/ — Teaching packages category landing per
// commission 2026-05-17 §8.1 4-card homepage restructure. Companion landing to
// the existing per-package route at /[locale]/teaching-packages/[packageSlug]/
// (which already exists).
//
// This commission ships a minimal SSR placeholder. The full strand-grouped
// browseable index (6 strands per §A.13.37 — Numeracy / Literacy / Vocabulary /
// World-knowledge / Logic / SEL) is a downstream commission. CategoryNav
// dropdown points at /?strand=<strand-key> query-string filter, which this
// page does not yet implement.

const BASE_URL = 'https://www.lessoncraftstudio.com';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.teachingPackages' });
  return {
    title: `${t('title')} | LessonCraftStudio`,
    description: t('description'),
    alternates: { canonical: `${BASE_URL}/${locale}/teaching-packages/` },
    robots: { index: false, follow: true }, // placeholder; remove noindex once full index ships
  };
}

export default async function TeachingPackagesIndexPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.teachingPackages' });

  return (
    <main className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
      <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
        {t('title')}
      </h1>
      <p className="text-lg md:text-xl text-ink-600 leading-relaxed max-w-3xl">
        {t('description')}
      </p>
    </main>
  );
}
