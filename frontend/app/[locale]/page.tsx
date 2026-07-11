import { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/organization-schema';
import HeroV4 from '@/components/homepage-v4/HeroV4';
import TryItBandV4 from '@/components/homepage-v4/TryItBandV4';
import PillarMakersV4 from '@/components/homepage-v4/PillarMakersV4';
import MoatLanguagesV4 from '@/components/homepage-v4/MoatLanguagesV4';
import ActivitiesMoatV4 from '@/components/homepage-v4/ActivitiesMoatV4';
import FreeAndTeacherV4 from '@/components/homepage-v4/FreeAndTeacherV4';
import EmbedShareV4 from '@/components/homepage-v4/EmbedShareV4';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import SignupV4 from '@/components/homepage-v4/SignupV4';
import './preview/homepage-v3/homepage-v3.css';
import './preview/homepage-v4/homepage-v4.css';

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
      images: [{ url: `${BASE_URL}${OG_IMAGE_PATH}`, alt: t('ogAlt') }],
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

      {/* Clean light ground for the professional redesign (2026-07-11).
          Scoped to this page; unmounts on navigation. */}
      <style>{`
        body { background: #FDFBF6 !important; color: #14322D; }
        body::before { display: none; }
      `}</style>

      <main className={`hv3 hv5 ${baloo2.variable} ${nunito.variable} font-lcsBody text-[#14322D] min-h-screen`}>
        {/* 9-section maker-first stack (2026-07-11 redesign). Order:
            hero -> try-it -> makers -> language moat -> activities ->
            free/Teacher -> share -> browse (crawl-bait) -> close. */}
        <HeroV4 locale={locale} />
        <TryItBandV4 locale={locale} />
        <PillarMakersV4 locale={locale} />
        <MoatLanguagesV4 locale={locale} />
        <ActivitiesMoatV4 locale={locale} />
        <FreeAndTeacherV4 locale={locale} />
        <EmbedShareV4 locale={locale} />
        <BrowseByTopicSSR
          locale={locale}
          maxThemesPerGroup={40}
          includeGradeGroup
          includeLanguageGroup
        />
        <SignupV4 locale={locale} />
      </main>
    </>
  );
}
