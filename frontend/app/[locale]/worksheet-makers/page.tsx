import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

// /[locale]/worksheet-makers/ — Apps category landing (formerly admin-only per
// CLAUDE.md §17.2 Pass 8; reopened publicly per operator's 2026-05-17 strategic
// lock §8.1 with daily download-limits for free users in a downstream commission).
//
// This commission ships a minimal SSR placeholder. Full per-app marketing surface
// is downstream — operator decision pending on whether each of the 29 §14.10 apps
// gets its own /[locale]/worksheet-makers/<app-slug>/ page or if a single
// gallery-style listing suffices.
//
// Per §17.4: server-rendered; native-language slug; locale-prefixed; native
// `<head>` title + description; Schema.org optional at this placeholder stage.

const BASE_URL = 'https://www.lessoncraftstudio.com';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.apps' });
  return {
    title: `${t('title')} | LessonCraftStudio`,
    description: t('description'),
    alternates: { canonical: `${BASE_URL}/${locale}/worksheet-makers/` },
    robots: { index: false, follow: true }, // placeholder; remove noindex once full marketing surface lands
  };
}

export default async function WorksheetMakersPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.apps' });
  const homeT = await getTranslations({ locale, namespace: 'homepage.hero' });

  return (
    <main className="container mx-auto px-4 max-w-6xl py-16 md:py-24">
      <h1 className="font-display font-semibold text-3xl md:text-5xl text-ink-900 leading-tight tracking-tight mb-6">
        {t('title')}
      </h1>
      <p className="text-lg md:text-xl text-ink-600 leading-relaxed mb-12 max-w-3xl">
        {t('description')}
      </p>
      <p className="text-base text-ink-500 max-w-3xl leading-relaxed">
        {homeT('interaction')}
      </p>
    </main>
  );
}
