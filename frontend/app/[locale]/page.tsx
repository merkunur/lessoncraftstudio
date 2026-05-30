import { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/organization-schema';
import HeroV3 from '@/components/homepage-v3/HeroV3';
import PillarActivities from '@/components/homepage-v3/PillarActivities';
import PillarInteractive from '@/components/homepage-v3/PillarInteractive';
import PillarPrintables from '@/components/homepage-v3/PillarPrintables';
import TierTransition from '@/components/homepage-v3/TierTransition';
import PillarMakers from '@/components/homepage-v3/PillarMakers';
import PillarTools from '@/components/homepage-v3/PillarTools';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import EmbedShareV3 from '@/components/homepage-v3/EmbedShareV3';
import SignupV3 from '@/components/homepage-v3/SignupV3';
import './preview/homepage-v3/homepage-v3.css';

// Promoted from the homepage-v3 prototype on 2026-05-24. Live design now
// uses the 9-section homepage-v3 stack (Hero → 5 pillars → tier transition
// → embed/share → signup). homepage-v2 components remain on disk for
// rollback safety and continued use by the worksheet-makers landing
// (consumer of homepage.fourCardGrid.apps namespace).

// Direction A typography pairing per CLAUDE.md §A.13.47 (locked).
// Baloo 2 + Nunito; latin-ext covers all 11 site locales.
const baloo2 = Baloo_2({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-baloo-2',
  display: 'swap',
  preload: true,
});

const nunito = Nunito({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext'],
  variable: '--font-nunito',
  display: 'swap',
  preload: true,
});

// 1-hour ISR matches existing site pattern; visitor-facing copy churns rarely.
export const revalidate = 3600;

const BASE_URL = 'https://www.lessoncraftstudio.com';

// OG image: brand-only 1200×630 asset authored 2026-05-24 as Phase 2 of the
// SEO cleanup commission. Generated reproducibly by
// scripts/og-images/generate-homepage-og.js (Direction A palette: cream
// #FBF3E4 / teal #146B5E title / coral #F2784B accents). Locale-independent;
// served by Next.js from frontend/public/. Previous v2 reference pointed at
// /de/decks/picture-path/og-image.png — a German-locale-pathed deck
// thumbnail that leaked the wrong context onto all 11 locales' og:image.
const OG_IMAGE_PATH = '/og-homepage.png';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  // homepage.meta namespace reused: keys are brand-level (not v2-design-
  // specific) and already localized in all 11 locales. v3 design swap
  // doesn't change brand positioning.
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });

  // Hreflang alternates for all 11 locales.
  const hreflangAlternates: Record<string, string> = {};
  for (const lang of SUPPORTED_LOCALES) {
    hreflangAlternates[getHreflangCode(lang)] = `${BASE_URL}/${lang}`;
  }
  hreflangAlternates['x-default'] = `${BASE_URL}/en`;

  return {
    // Brand suffix `· LessonCraftStudio` is applied by the root layout's
    // `title.template` (added Phase 1 of SEO cleanup 2026-05-24). The
    // `homepage.meta.title` per locale is the descriptive part only.
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

// Schema.org JSON-LD: Organization + WebSite. Sourced from the single
// sitewide module at `@/lib/seo/organization-schema` (see §17.8 + Phase 4
// of the SEO remediation arc). Every page that needs to identify the
// publisher references the same `@id` rather than duplicating properties.
// SearchAction + sameAs omitted (no operator-confirmed search endpoint or
// social profiles — TODO(operator) is tracked in organization-schema.ts).
function buildSchemas(locale: string, _title: string, description: string) {
  return [
    buildOrganizationSchema(description),
    buildWebSiteSchema(locale, description),
  ];
}

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });

  const schemas = buildSchemas(locale, t('ogTitle'), t('description'));

  return (
    <>
      {/* JSON-LD structured data — Organization + WebSite. */}
      {schemas.map((schema, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Homepage-v3 body bg override (deep teal #0E544A + chalk-on-teal
          endpaper pattern). Scoped to this page only — when user navigates
          away, the inline style unmounts and parent body bg returns. */}
      <style>{`
        body {
          background: #0E544A !important;
          color: #FBF3E4;
          background-image:
            url("data:image/svg+xml;utf8,%3Csvg width='280' height='280' viewBox='0 0 280 280' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23FBF3E4' stroke-width='1.6' stroke-linecap='round' opacity='0.12'%3E%3Cpath d='M 28 36 q 5 -7 10 0 t 10 0' /%3E%3Cpath d='M 210 70 q 4 -6 8 0 t 8 0' /%3E%3Cpath d='M 76 220 q 6 -8 12 0 t 12 0' /%3E%3Cpath d='M 130 140 q 5 -6 10 0' /%3E%3C/g%3E%3Cg fill='%23F2784B' opacity='0.14'%3E%3Cpath d='M 110 52 l 1.8 4.6 l 4.6 0.6 l -3.4 2.8 l 1.2 4.6 l -4 -2.4 l -4 2.4 l 1.2 -4.6 l -3.4 -2.8 l 4.6 -0.6 z' /%3E%3Cpath d='M 232 190 l 1.4 3.4 l 3.4 0.4 l -2.4 2 l 0.8 3.4 l -3 -1.8 l -3 1.8 l 0.8 -3.4 l -2.4 -2 l 3.4 -0.4 z' /%3E%3Cpath d='M 50 168 l 1.2 3 l 3 0.4 l -2 1.8 l 0.6 3 l -2.6 -1.6 l -2.6 1.6 l 0.6 -3 l -2 -1.8 l 3 -0.4 z' /%3E%3C/g%3E%3Cg fill='%23FBF3E4' opacity='0.10'%3E%3Ccircle cx='170' cy='28' r='2.4'/%3E%3Ccircle cx='44' cy='124' r='2.8'/%3E%3Ccircle cx='250' cy='240' r='2'/%3E%3Ccircle cx='132' cy='210' r='1.8'/%3E%3Ccircle cx='14' cy='210' r='1.8'/%3E%3Ccircle cx='200' cy='115' r='2.2'/%3E%3C/g%3E%3Cg fill='none' stroke='%23F2784B' stroke-width='1.5' stroke-linecap='round' opacity='0.13'%3E%3Cpath d='M 58 80 q 10 -5 20 0' /%3E%3Cpath d='M 190 150 q 8 -5 16 0' /%3E%3C/g%3E%3C/svg%3E");
          background-size: 280px 280px;
          background-repeat: repeat;
        }
        body::before { display: none; }
      `}</style>

      <main className={`hv3 ${baloo2.variable} ${nunito.variable} font-lcsBody text-lcs-cream min-h-screen`}>
        <HeroV3 locale={locale} />
        <PillarActivities locale={locale} />
        <PillarInteractive locale={locale} />
        <PillarPrintables locale={locale} />
        <TierTransition locale={locale} />
        <PillarMakers locale={locale} />
        <PillarTools locale={locale} />
        <BrowseByTopicSSR locale={locale} />
        <EmbedShareV3 locale={locale} />
        <SignupV3 locale={locale} />
      </main>
    </>
  );
}
