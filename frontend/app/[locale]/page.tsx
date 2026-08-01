import { Metadata } from 'next';
import { Baloo_2, Nunito } from 'next/font/google';
import { getTranslations } from 'next-intl/server';
import { SUPPORTED_LOCALES } from '@/config/locales';
import { getHreflangCode, ogLocaleMap } from '@/lib/schema-generator';
import { buildOrganizationSchema, buildWebSiteSchema } from '@/lib/seo/organization-schema';
import OpeningV6 from '@/components/homepage-v6/OpeningV6';
import TeachMomentV6 from '@/components/homepage-v6/TeachMomentV6';
import PracticeMomentV6 from '@/components/homepage-v6/PracticeMomentV6';
import MakeMomentV6 from '@/components/homepage-v6/MakeMomentV6';
import BothWaysV6 from '@/components/homepage-v6/BothWaysV6';
import ShareMomentV6 from '@/components/homepage-v6/ShareMomentV6';
import KeepMomentV6 from '@/components/homepage-v6/KeepMomentV6';
import TeacherMomentV6 from '@/components/homepage-v6/TeacherMomentV6';
import CloseV6 from '@/components/homepage-v6/CloseV6';
import ToolVignette from '@/components/homepage-v6/ToolVignette';
import BrowseByTopicSSR from '@/components/homepage-v3/BrowseByTopicSSR';
import { getTypedThumbs } from '@/lib/showcase-decks';
import '@/components/homepage-v6/homepage-v6.css';

// Promoted 2026-08-01: homepage v6 "The Lesson Line" — one continuous
// teaching narrative (a number line runs the page; tools/activities/
// worksheets/makers/sharing are moments along it, not sections), working
// pure-CSS apparatus vignettes as connective tissue, counts only in
// captions, multilingual demoted to a quiet chip row. The v6 stack was
// approved on /[locale]/preview/homepage-v6 (kept as the visual-diff
// safety net, same pattern as the v3/v4 promotions). homepage-v2/-v3/-v4
// components remain on disk for rollback + shared consumers
// (BrowseByTopicSSR + FeaturedDeckTileV3 live in homepage-v3/).

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
// served by Next.js from frontend/public/.
const OG_IMAGE_PATH = '/og-homepage.png';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const locale = params.locale || 'en';
  // homepage.meta namespace reused: keys are brand-level (not design-
  // specific) and already localized in all 11 locales. The v6 design swap
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
    // `title.template`. The `homepage.meta.title` per locale is the
    // descriptive part only.
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
function buildSchemas(locale: string, _title: string, description: string) {
  return [
    buildOrganizationSchema(description),
    buildWebSiteSchema(locale, description),
  ];
}

const FALLBACK_TRAVELER =
  'https://www.lessoncraftstudio.com/en/decks/addition-find-addend-animals/thumbnail.png';

export default async function HomePage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'en';
  const t = await getTranslations({ locale, namespace: 'homepage.meta' });
  const t6 = await getTranslations({ locale, namespace: 'homepageV6' });

  const schemas = buildSchemas(locale, t('ogTitle'), t('description'));

  // The traveler artifact: ONE worksheet in the visitor's language that
  // reappears at Make (born), Print (its paper twin) and Share (in 25
  // hands). EN keeps the hand-picked deck; DB failure falls back to it too.
  let travelerThumb = FALLBACK_TRAVELER;
  if (locale !== 'en') {
    try {
      travelerThumb = (await getTypedThumbs(locale, ['addition']))[0] ?? FALLBACK_TRAVELER;
    } catch {
      /* keep fallback */
    }
  }

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

      {/* Clean light ground; scoped to this page, unmounts on navigation. */}
      <style>{`
        body { background: #FDFBF6 !important; color: #14322D; }
        body::before { display: none; }
      `}</style>

      {/* div, not main: LocaleLayoutClient already wraps children in <main>
          (the v4 page nested a second <main> — fixed at the v6 promotion). */}
      <div className={`hv6 ${baloo2.variable} ${nunito.variable} font-lcsBody text-[#14322D] min-h-screen`}>
        <OpeningV6 locale={locale} travelerThumb={travelerThumb} />

        {/* THE THREAD — one element, one long gradient, one line. Sections
            inside cannot band: the ground belongs to the thread, not to them. */}
        <div className="hv6-thread hv6-rise">
          <TeachMomentV6 locale={locale} />
          <ToolVignette variant="balance" caption={t6('teach.penBalance')} />
          <PracticeMomentV6 locale={locale} />
          <ToolVignette variant="choral" caption={t6('practice.penChoral')} />
          <MakeMomentV6 locale={locale} travelerThumb={travelerThumb} />
          <ToolVignette variant="letter-tiles" caption={t6('make.penTiles')} />
          <BothWaysV6 locale={locale} travelerThumb={travelerThumb} />
          <ShareMomentV6 locale={locale} travelerThumb={travelerThumb} />
          <ToolVignette variant="clock" caption={t6('share.penClock')} />
          <KeepMomentV6 locale={locale} />
          <TeacherMomentV6 locale={locale} />
        </div>

        <CloseV6 locale={locale} />

        {/* The Class Index — the number line's arrowhead lands here. The
            crawl-bait mesh (Do NOT remove — primary crawlable links),
            restyled as pinned index cards + the 47-tool group. */}
        <BrowseByTopicSSR
          locale={locale}
          maxThemesPerGroup={40}
          includeGradeGroup
          includeLanguageGroup
          variant="hv6"
        />
      </div>
    </>
  );
}
