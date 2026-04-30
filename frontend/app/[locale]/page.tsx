import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import Hero from '@/components/homepage-v2/Hero';
import FreeExperience from '@/components/homepage-v2/FreeExperience';

// Cache headers per HOMEPAGE-IMPLEMENTATION-PROMPT.md §6 / CLAUDE.md §17.4 LCP target.
// 1-hour ISR matches existing site pattern; visitor-facing copy churns rarely.
export const revalidate = 3600;

const BASE_URL = 'https://www.lessoncraftstudio.com';

// OG image: reuse the featured deck's existing 1200×630 OG asset per HOMEPAGE-COPY.md
// page-level meta. Featured deck is de/picture-path per frontend/config/homepage-featured-decks.json.
// Brief B Phase 3 og-image.png is co-located with the deck assets in the nginx-served versioned dir.
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

      {/* Section 1 — Hero */}
      <Hero locale={locale} />

      {/* Section 2 — Breadth grid (added in pass 2) */}

      {/* Section 3 — Language proof (added in pass 3) */}

      {/* Section 4 — The free experience */}
      <FreeExperience locale={locale} />

      {/* Section 5 — Subscription (added in pass 3) */}
    </>
  );
}
