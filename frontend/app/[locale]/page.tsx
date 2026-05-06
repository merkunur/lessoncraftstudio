import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import Hero from '@/components/homepage-v2/Hero';
import ExerciseTypeGrid from '@/components/homepage-v2/ExerciseTypeGrid';
import MagnitudeFraming from '@/components/homepage-v2/MagnitudeFraming';
import ThemeStrip from '@/components/homepage-v2/ThemeStrip';
import LocaleStrip from '@/components/homepage-v2/LocaleStrip';
import EmbedViralityCTA from '@/components/homepage-v2/EmbedViralityCTA';
import LanguageProof from '@/components/homepage-v2/LanguageProof';
import FreeExperience from '@/components/homepage-v2/FreeExperience';
import SubscriptionSection from '@/components/homepage-v2/SubscriptionSection';

// Cache headers per HOMEPAGE-IMPLEMENTATION-PROMPT.md §6 / CLAUDE.md §17.4 LCP target.
// 1-hour ISR matches existing site pattern; visitor-facing copy churns rarely.
export const revalidate = 3600;

const BASE_URL = 'https://www.lessoncraftstudio.com';

// OG image: fixed page-level 1200×630 asset per HOMEPAGE-COPY.md. Co-located
// with deck assets in the nginx-served versioned dir; locale-independent.
const OG_IMAGE_PATH = '/de/decks/picture-path/og-image.png';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });

  // Hreflang alternates for all 11 locales.
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = `${BASE_URL}/${lang}`;
  }
  hreflangAlternates['x-default'] = `${BASE_URL}/en`;

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${BASE_URL}/${locale}`,
      languages: hreflangAlternates,
    },
    openGraph: {
      title: t('ogTitle'),
      description: t('ogDescription'),
      type: 'website',
      url: `${BASE_URL}/${locale}`,
      siteName: 'LessonCraftStudio',
      locale: ogLocaleMap[locale] || locale,
      alternateLocale: SUPPORTED_LOCALES.filter(l => l !== locale).map(l => ogLocaleMap[l] || l),
      images: [
        {
          url: `${BASE_URL}${OG_IMAGE_PATH}`,
          width: 1200,
          height: 630,
          type: 'image/png',
          alt: t('ogAlt'),
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('ogDescription'),
      images: [`${BASE_URL}${OG_IMAGE_PATH}`],
    },
  };
}

// Schema.org JSON-LD per HOMEPAGE-IMPLEMENTATION-PROMPT.md §6.9.
// Organization + WebSite. SearchAction omitted (catalog index doesn't ship before home page
// per the catalog-index decision). sameAs omitted (no official social profiles per
// HOMEPAGE-SAVE-STATE.md). Per CLAUDE.md §17.4 / §17.8, deck pages and topic pages carry
// their own schema; home page does not duplicate those.
function buildSchemas(locale: string, title: string, description: string) {
  const organization = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BASE_URL}/#organization`,
    name: 'LessonCraftStudio',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      '@id': `${BASE_URL}/#logo`,
      url: `${BASE_URL}/logo-lcs.png`,
      width: 600,
      height: 600,
    },
    description,
    areaServed: 'Worldwide',
    availableLanguage: [
      'English', 'German', 'French', 'Spanish', 'Portuguese', 'Italian',
      'Dutch', 'Swedish', 'Danish', 'Norwegian', 'Finnish',
    ],
  };

  const website = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    url: BASE_URL,
    name: 'LessonCraftStudio',
    description,
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: locale,
  };

  return [organization, website];
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });

  const schemas = buildSchemas(locale, t('ogTitle'), t('description'));

  return (
    <>
      {/* JSON-LD structured data — Organization + WebSite per §6.9 */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Section 1 — Hero (LOCKED per HOMEPAGE-SAVE-STATE.md) */}
      <Hero locale={locale} />

      {/* Section 2 — Above-fold structural-axes density per Alt A architecture
          lock (Arc 3, 2026-05-06). Order matters: visible-evidence first
          (29 icons), then numerical context (axis-product), then second-axis
          variety (themes), then locale signal, then conversion CTA. The
          BreadthGrid that previously occupied this position is demoted to
          Section 4 (FreeExperience) as a "see one in action" sub-section. */}
      <ExerciseTypeGrid locale={locale} />
      <MagnitudeFraming locale={locale} />
      <ThemeStrip locale={locale} />
      <LocaleStrip />
      <EmbedViralityCTA locale={locale} />

      {/* Section 3 — Language proof */}
      <LanguageProof locale={locale} />

      {/* Section 4 — The free experience (now contains demoted BreadthGrid) */}
      <FreeExperience locale={locale} />

      {/* Section 5 — Subscription */}
      <SubscriptionSection locale={locale} />
    </>
  );
}
