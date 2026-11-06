import { Metadata } from 'next';
import { INDEXABLE_ROBOTS } from '@/lib/seo/robots';
import { getTranslations } from 'next-intl/server';
import { CANONICAL_HOST, canonicalUrl, localePath } from '@/lib/seo/url';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import MakerHubPage from '@/components/maker-hub/MakerHubPage';

// /[locale]/worksheet-makers/ — Worksheet creators (Apps) category landing.
//
// The hub of the new worksheet makers (2026-11-06): the render body lives in
// components/maker-hub/MakerHubPage.tsx. It lists the 59 makers with their landings
// at /{locale}/worksheet-makers/<native-slug> and still links all 33 classic
// /{locale}/tools/<slug> maker landings, so each keeps its internal link.
//
// generateMetadata below is UNCHANGED from the pre-redesign page
// (SEO churn freeze §21.5a — title/description/canonical/hreflang/OG
// byte-stable). No searchParams/cookies reads anywhere on this route:
// the nginx hub-cache patch assumes it stays statically renderable.

const BASE_URL = CANONICAL_HOST;

// 1-hour ISR: the page now shows one published-deck specimen per maker
// (two narrow Prisma queries per revalidation; DB-down renders drawn
// specimens instead — never an error).
export const revalidate = 3600;

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.fourCardGrid.apps' });

  // This hub exists in all 11 locales, but shipped canonical-only — no hreflang and
  // no openGraph at all, so the locale variants never declared each other.
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = canonicalUrl(localePath(lang, 'worksheet-makers'));
  }
  hreflangAlternates['x-default'] = canonicalUrl(localePath('en', 'worksheet-makers'));

  const url = canonicalUrl(localePath(locale, 'worksheet-makers'));
  return {
    title: `${t('title')}`,
    description: t('description'),
    alternates: {
      canonical: url,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      url,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter((l) => l !== locale).map((l) => ogLocaleMap[l] || l),
    },
    // Indexable hub for the worksheet-maker SEO channel (SEO RESCUE Part 1).
    robots: INDEXABLE_ROBOTS,
  };
}

export default async function WorksheetMakersPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  return <MakerHubPage locale={locale} />;
}
